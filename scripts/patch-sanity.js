import fs from 'fs';

const file1 = 'node_modules/@sanity/visual-editing/dist/_chunks-es/VisualEditing.js';
if (fs.existsSync(file1)) {
  let content = fs.readFileSync(file1, 'utf8');
  content = content.replace('useEffectEvent, ', '').replace(', useEffectEvent', '');
  content = content.replace(
    'const handlePerspective = useEffectEvent(t0);',
    'const ref = useRef(t0); ref.current = t0; const handlePerspective = (...args) => ref.current(...args);'
  );
  fs.writeFileSync(file1, content);
}

const file2 = 'node_modules/@sanity/visual-editing/dist/react/index.js';
if (fs.existsSync(file2)) {
  let content = fs.readFileSync(file2, 'utf8');
  content = content.replace('useEffectEvent, ', '').replace(', useEffectEvent', '');
  content = content.replace(
    'const handleQueryHeartbeat = useEffectEvent(t3);',
    'const ref1 = useRef(t3); ref1.current = t3; const handleQueryHeartbeat = (...args) => ref1.current(...args);'
  );
  content = content.replace(
    'const handleQueryChange = useEffectEvent(t4);',
    'const ref2 = useRef(t4); ref2.current = t4; const handleQueryChange = (...args) => ref2.current(...args);'
  );
  fs.writeFileSync(file2, content);
}

console.log('Patched Sanity visual-editing for React 19 compatibility.');
