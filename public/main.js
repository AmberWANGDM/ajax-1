// 请求css style.css
getCSS.addEventListener('click', () => {
  const request = new XMLHttpRequest()
  request.open('GET', '/style.css')
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status >= 200 && request.status < 300) {
        // 创建style标签,响应内容写入,插入到head
        const style = document.createElement('style')
        style.innerHTML = request.response
        document.head.appendChild(style)
      }
    }
  }
  request.send()
})

// 请求js 2.js
getJS.addEventListener('click', () => {
  const request = new XMLHttpRequest()
  request.open('GET', '/2.js')
  request.onload = () => {
    // 创建script标签,响应内容写入,插入到body
    const script = document.createElement('script')
    script.innerHTML = request.response
    document.body.appendChild(script)
  }
  request.onerror = () => {
    console.log('fail!')
  }
  request.send()
})

// 请求html  3.html
getHTML.addEventListener('click', () => {
  const request = new XMLHttpRequest()
  request.open('GET', '/3.html')
  request.onload = () => {
    const div = document.createElement('div')
    div.innerHTML = request.response
    document.body.appendChild(div)
  }
  request.onerror = () => {
    console.log('fail!')
  }
  request.send()
})

// 请求xml  4.xml
getXML.addEventListener('click', () => {
  const request = new XMLHttpRequest()
  request.open('GET', '/4.xml')
  request.onreadystatechange = () => {
    if (
      request.readyState === 4 &&
      request.status >= 200 &&
      request.status < 300
    ) {
      const dom = request.responseXML
      const text = dom.getElementsByTagName('warning')[0].textContent
      console.log(text.trim())
    }
  }
  request.send()
})

// 请求json 5.json
getJSON.addEventListener('click', () => {
  const request = new XMLHttpRequest()
  request.open('GET', '/5.json')
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      const obj = JSON.parse(request.response)
      myName.textContent = obj.name
    }
  }
  request.send()
})

// 分页
let n = 1
nextPage.addEventListener('click', () => {
  const request = new XMLHttpRequest()
  request.open('GET', `/page${++n}.json`)
  if (n === 3) {
    nextPage.disabled = true
    nextPage.textContent = '到底啦'
  }
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      const list = JSON.parse(request.response)
      let result = list.map((item) => `<li>${item.id}</li>`).join('')
      pageList.innerHTML += result
    }
  }
  request.send()
})
