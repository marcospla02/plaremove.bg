<script lang="ts">
  import 'two-up-element'
  import Swal from "sweetalert2"

  import { originalImage, modifiedImage } from "../Store/Store";

  let processingImage = true
  let tries = 0
  let intervalId: any

  $: {
    if (processingImage) {
      clearInterval(intervalId)
      intervalId = setInterval(() => {
        tries++
        const img = new Image()
        img.src = $modifiedImage
        img.onload = () => {
          processingImage = false
          clearInterval(intervalId)
        }
      }, 500)
      if(tries > 50){
          processingImage = false
          clearInterval(intervalId)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Perdon, si sale este alert significa que no puedo procesar mas imagenes, si quiere ver como funciona por favor mire el video.',
          })
      }
    }
  }
</script>

<two-up>
  <img src={$originalImage} alt="Imagen original subida por el usuario" />
  {#if processingImage}
    <div class="flex flex-col justify-center items-center">
      <p class="text-center mt-4">Procesando imagen...</p>
    </div>
  {:else}
    <img src={$modifiedImage} alt="Imgen sin fondo" />
  {/if}
</two-up>

<a
  download
  href={$modifiedImage}
  class="block bg-blue-500 hover:bg-blue-700 text-xl text-center w-full font-bold text-white rounded-full px-4 py-2 mt-10"
>
  Descargar imagen sin fondo
</a>
