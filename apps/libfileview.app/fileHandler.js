window.openFile = function (path) {
    let ext = path.split('.').slice('-1')[0] 
    switch (ext) {
        case 'txt':
            openText(path)
            break;
        case 'mp3':
            openAudio(path, 'audio/mpeg')
            break;
        case 'flac':
            openAudio(path, 'audio/flac')
            break;
        case 'wav':
            openAudio(path, 'audio/wav')
            break;
        case 'ogg':
            openAudio(path, 'audio/ogg')
            break;
        case 'mp4':
            openVideo(path, 'video/mp4')
            break;
        case 'mov':
            openVideo(path, 'video/mp4')
            break;
        case 'webm':
            openVideo(path, 'video/webm')
            break;
        case 'gif':
            openImage(path, 'image/gif')
            break;
        case 'png':
            openImage(path, 'image/png')
            break;
        case 'jpg':
        case 'jpeg':
            openImage(path, 'image/jpeg')
            break;
        case 'pdf':
            openPDF(path)
            break;
            

    }
}

function openImage(path, mimetype) {
    fs.readFile(path, function(err, data) {
        let fileView = window.parent.AliceWM.create("Image File")
        let bloburl = URL.createObjectURL(new Blob([data]))
        let image = document.createElement('img')
        image.setAttribute("type", mimetype)
        image.src = bloburl
        image.style = "width: 100%; height: 100%;"
        fileView.content.appendChild(image)
    })
}

function openPDF(path) {
    alert('Holy shit why are you trying to view a pdf...')
    fs.readFile(path, function(err, data) {
        let fileView = window.parent.AliceWM.create("PDF File")
        let bloburl = URL.createObjectURL(new Blob([data], { type: "application/pdf" }))
        let doc = document.createElement('embed')
        doc.setAttribute("type", "application/pdf")
        doc.src = bloburl
        doc.style = "width: 100%; height: 100%;"
        fileView.content.appendChild(doc)
    })
}

function openAudio(path, mimetype) {
    fs.readFile(path, function(err, data) {
        let fileView = window.parent.AliceWM.create("Audio File")
        fileView.content.parentElement.style.width = "300px"
        fileView.content.parentElement.style.height = "83px"
        let bloburl = URL.createObjectURL(new Blob([data]))
        let audio = document.createElement('audio')
        audio.src = bloburl
        audio.setAttribute('controls', '')
        audio.setAttribute("type", mimetype)
        fileView.content.appendChild(audio)
    })
}
function openVideo(path, mimetype) {
    fs.readFile(path, function(err, data) {
        let fileView = window.parent.AliceWM.create("Video File")
        let bloburl = URL.createObjectURL(new Blob([data]))
        let video = document.createElement('video')
        let source = document.createElement('source')
        source.src = bloburl
        video.setAttribute('controls', '')
        video.setAttribute('autoplay', '')
        source.setAttribute("type", mimetype)
        video.style = "width: 100%; height: 100%;"
        video.appendChild(source)
        fileView.content.appendChild(video)
    })
}

function openText(path) {
    fs.readFile(path, function(err, data)  {
        let fileView = window.parent.AliceWM.create("Text Viewer");
        fileView.content.innerText = data;
    })
}