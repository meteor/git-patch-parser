export interface DiffLine {
  type: 'context' | 'added' | 'removed'
  content: string
}

export interface DiffRange {
  start: number
  lines: number
}

export interface DiffSection {
  lines: DiffLine[]
  lineNumbers: {
    added: DiffRange
    removed: DiffRange
  }
}

export interface ParsedPatch {
  sha: string
  message: string
  files: { [file: string]: DiffSection[] }
}

export function parsePatch(contents: string): ParsedPatch
export function parseMultiPatch(contents: string): ParsedPatch[]
export function parseUnifiedDiff(contents: string): DiffSection[]
