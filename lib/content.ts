import fs from 'fs';
import path from 'path';

const CONTENT_PATH = path.join(process.cwd(), 'data', 'content.json');

export function getContent() {
  const raw = fs.readFileSync(CONTENT_PATH, 'utf-8');
  return JSON.parse(raw);
}

export function writeContent(content: unknown): void {
  fs.writeFileSync(CONTENT_PATH, JSON.stringify(content, null, 2), 'utf-8');
}
