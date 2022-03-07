const inputFile = $("[name='avatar']");
const previewContainer = $('#imagePreview')
const previewImage = document.querySelector('.image-preview__image')
const previewDefaultText = document.querySelector('.image-preview__default-text')

inputFile.change(function () {
    const file = this.files[0]

    if (file) {
        const reader = new FileReader()

        previewDefaultText.style.display = 'none'
        previewImage.style.display = 'block'

        reader.addEventListener('load',function () {
            previewImage.setAttribute("src",this.result)
        })

        reader.readAsDataURL(file)
    }
})