export interface Language {
  id: string;
  name: string;
  icon: string;
}

export const languages: Language[] = [
  { id: 'python', name: 'Python', icon: 'python' },
  { id: 'nodejs', name: 'Node.js', icon: 'nodejs' },
  { id: 'csharp', name: 'C#', icon: 'hash' },
  { id: 'java', name: 'Java', icon: 'coffee' },
  { id: 'php', name: 'PHP', icon: 'php' },
  { id: 'go', name: 'Go', icon: 'box' },
  { id: 'ruby', name: 'Ruby', icon: 'gem' },
  { id: 'rust', name: 'Rust', icon: 'cog' },
  { id: 'scala', name: 'Scala', icon: 'layers' },
  { id: 'kotlin', name: 'Kotlin', icon: 'smartphone' },
  { id: 'swift', name: 'Swift', icon: 'zap' },
  { id: 'dart', name: 'Dart', icon: 'target' },
  { id: 'elixir', name: 'Elixir', icon: 'flask' },
  { id: 'clojure', name: 'Clojure', icon: 'circle' },
  { id: 'haskell', name: 'Haskell', icon: 'infinity' },
  { id: 'perl', name: 'Perl', icon: 'terminal' },
  { id: 'r', name: 'R', icon: 'bar-chart' },
  { id: 'julia', name: 'Julia', icon: 'circle-dot' },
  { id: 'lua', name: 'Lua', icon: 'moon' },
  { id: 'erlang', name: 'Erlang', icon: 'network' },
  { id: 'groovy', name: 'Groovy', icon: 'music' },
  { id: 'crystal', name: 'Crystal', icon: 'diamond' },
  { id: 'nim', name: 'Nim', icon: 'crown' },
  { id: 'ocaml', name: 'OCaml', icon: 'code' },
  { id: 'f#', name: 'F#', icon: 'hash' },
  { id: 'racket', name: 'Racket', icon: 'circle' },
  { id: 'elm', name: 'Elm', icon: 'tree' },
  { id: 'fortran', name: 'Fortran', icon: 'calculator' },
  { id: 'cobol', name: 'COBOL', icon: 'archive' },
  { id: 'pascal', name: 'Pascal', icon: 'book' }
];