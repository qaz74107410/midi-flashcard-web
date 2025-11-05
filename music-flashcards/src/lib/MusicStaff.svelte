<script>
  import { onMount } from 'svelte';
  import Vex from 'vexflow';

  export let clef = 'treble';
  export let note = 'C/4';

  let container;

  onMount(() => {
    if (container) {
      const VF = Vex.Flow;

      // Create an SVG renderer and attach it to the container.
      const renderer = new VF.Renderer(container, VF.Renderer.Backends.SVG);

      // Configure the rendering context.
      renderer.resize(500, 200);
      const context = renderer.getContext();

      // Create a stave of width 400 at position 10, 40 on the canvas.
      const stave = new VF.Stave(10, 40, 400);

      // Add a clef and time signature.
      stave.addClef(clef);

      // Connect it to the rendering context and draw!
      stave.setContext(context).draw();

      const notes = [
        new VF.StaveNote({ clef, keys: [note], duration: 'q' })
      ];

      // Create a voice in 4/4 and add above notes
      const voice = new VF.Voice({ num_beats: 1, beat_value: 4 });
      voice.addTickables(notes);

      // Format and justify the notes to 400 pixels.
      new VF.Formatter().joinVoices([voice]).format([voice], 400);

      // Render voice
      voice.draw(context, stave);
    }
  });
</script>

<div bind:this={container}></div>
