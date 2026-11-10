import { useState } from "react";

/**
 * True once `value` has differed from its first-render value (and stays true).
 *
 * Used to skip a keyed view's own entrance on first paint without
 * AnimatePresence initial={false}, which would also freeze the entrance of
 * every motion descendant (staggers, scroll reveals).
 */
export function useHasChanged<T>(value: T) {
  const [first] = useState(value);
  const [changed, setChanged] = useState(false);
  // Derived state: React re-renders immediately, before committing.
  if (!changed && !Object.is(value, first)) setChanged(true);
  return changed || !Object.is(value, first);
}
