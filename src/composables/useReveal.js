import { ref, onMounted, onUnmounted } from "vue";

/**
 * useReveal — triggers `visible` when the target enters the viewport.
 *
 * Single target:
 *   const { elRef, visible } = useReveal()
 *   <section ref="elRef" :class="{ visible }">
 *
 * Multi-target (each gets its own visible state):
 *   const { refs, visibles } = useRevealMany(['header', 'cards'])
 *   <div ref="refs.header" :class="{ visible: visibles.header }">
 *   <div ref="refs.cards"  :class="{ visible: visibles.cards }">
 *
 * @param {number} threshold  IntersectionObserver threshold (default 0.12)
 * @param {number} autoDelay  Auto-trigger delay ms, 0 = disabled
 */
export function useReveal(threshold = 0.12, autoDelay = 0) {
  const elRef   = ref(null);
  const visible = ref(false);
  let observer;

  onMounted(() => {
    if (autoDelay) setTimeout(() => (visible.value = true), autoDelay);
    observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) visible.value = true; },
      { threshold }
    );
    if (elRef.value) observer.observe(elRef.value);
  });

  onUnmounted(() => observer?.disconnect());
  return { elRef, visible };
}

/**
 * useRevealMany — observe multiple named elements independently.
 * @param {string[]} keys       Names for each ref/visible pair
 * @param {number}   threshold
 */
export function useRevealMany(keys, threshold = 0.12) {
  const refs     = Object.fromEntries(keys.map(k => [k, ref(null)]));
  const visibles = Object.fromEntries(keys.map(k => [k, ref(false)]));
  let observer;

  onMounted(() => {
    const refMap = new Map(keys.map(k => [refs[k].value, k]));

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const key = refMap.get(entry.target);
          if (key) visibles[key].value = true;
        });
      },
      { threshold }
    );

    keys.forEach(k => { if (refs[k].value) observer.observe(refs[k].value); });
  });

  onUnmounted(() => observer?.disconnect());
  return { refs, visibles };
}