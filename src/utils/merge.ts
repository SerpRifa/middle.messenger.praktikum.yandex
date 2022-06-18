export function merge(lhs: Indexed<any>, rhs: Indexed<any>): Indexed<any> {
  for (const p in rhs) {
    if (!rhs.hasOwnProperty(p)) {
      continue;
    }

    try {
      if (rhs[p].constructor === Object) {
        rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
      } else {
        lhs[p] = rhs[p];
      }
    } catch (e) {
      console.error(e);
    }
  }

  return lhs;
}
