import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { exec } from 'child_process';

export function activate(context: vscode.ExtensionContext) {
  let isEnabled = vscode.workspace.getConfiguration('musicalCoding').get<boolean>('enabled') ?? true;
  let currentScale = vscode.workspace.getConfiguration('musicalCoding').get<string>('scale') ?? 'C_major';

  const scales: Record<string, string[]> = vscode.workspace.getConfiguration('musicalCoding').get<Record<string, string[]>>('customScales') ?? {
    'C_major': ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'],
    'A_minor': ['A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5'],
  };

  context.subscriptions.push(
    vscode.commands.registerCommand('musicalCoding.toggleSound', () => {
      isEnabled = !isEnabled;
      vscode.workspace.getConfiguration('musicalCoding').update('enabled', isEnabled, true);
      vscode.window.showInformationMessage(`Musical typing is now ${isEnabled ? 'ON' : 'OFF'}`);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('musicalCoding.selectScale', async () => {
      const selected = await vscode.window.showQuickPick(Object.keys(scales));
      if (selected) {
        currentScale = selected;
        vscode.workspace.getConfiguration('musicalCoding').update('scale', selected, true);
        vscode.window.showInformationMessage(`Selected scale: ${selected}`);
      }
    })
  );

  vscode.workspace.onDidChangeTextDocument(event => {
    const changes = event.contentChanges;
    if (!isEnabled || changes.length === 0) return;

    const lastChange = changes[changes.length - 1];
    const insertedText = lastChange.text;

  // Normalize line endings
  const isEnter = insertedText === '\n' || insertedText === '\r\n';

      if (isEnter) {
        console.log("Enter key pressed");
        playRandomNote(currentScale, context, scales);
      }
  });
}

let lastNote: string | null = null;

function playRandomNote(
  scaleName: string,
  context: vscode.ExtensionContext,
  scales: Record<string, string[]>
) {
  const scale = scales[scaleName];
  if (!scale || scale.length === 0) return;

  // Filter out the last note
  const availableNotes = scale.filter(note => note !== lastNote);
  const notePool = availableNotes.length > 0 ? availableNotes : scale;

  // Pick a note that's not the same as the last
  const note = notePool[Math.floor(Math.random() * notePool.length)];
  lastNote = note;

  const noteFile = path.join(context.extensionPath, 'media', `${note}.wav`);

  if (!fs.existsSync(noteFile)) {
    vscode.window.showErrorMessage(`Missing audio file: ${noteFile}`);
    return;
  }

  const command = `powershell -WindowStyle Hidden -c (New-Object Media.SoundPlayer '${noteFile}').PlaySync();`;
  exec(command, (err) => {
    if (err) {
      vscode.window.showErrorMessage(`Error playing note ${note}: ${err.message}`);
    }
  });
}

export function deactivate() {}
