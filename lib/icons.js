/* Parses a plain CSS declaration string (as used in the original template)
   into a React style object, so every inline style below can stay
   byte-for-byte identical to the original design instead of being
   hand-transcribed into camelCase objects. */
export function s(str) {
  const style = {};
  str.split(";").forEach((decl) => {
    const idx = decl.indexOf(":");
    if (idx === -1) return;
    let prop = decl.slice(0, idx).trim();
    const value = decl.slice(idx + 1).trim();
    if (!prop || !value) return;
    if (!prop.startsWith("--")) {
      prop = prop.replace(/-([a-zA-Z])/g, (_, c) => c.toUpperCase());
    }
    style[prop] = value;
  });
  return style;
}

export function svgSpan(html) {
  return (
    <span
      style={{ display: "inline-flex", lineHeight: 0 }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export function ic(path, sw) {
  return svgSpan(
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' +
      (sw || 2) +
      '" stroke-linecap="round" stroke-linejoin="round">' +
      path +
      "</svg>"
  );
}
