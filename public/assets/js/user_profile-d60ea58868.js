const inputFile=$("[name='avatar']"),previewContainer=$("#imagePreview"),previewImage=document.querySelector(".image-preview__image"),previewDefaultText=document.querySelector(".image-preview__default-text");inputFile.change((function(){const e=this.files[0];if(e){const t=new FileReader;previewDefaultText.style.display="none",previewImage.style.display="block",t.addEventListener("load",(function(){previewImage.setAttribute("src",this.result)})),t.readAsDataURL(e)}}));