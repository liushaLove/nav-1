const $siteList = $(".site-list"),
      $lastLi = $siteList.find("li.last"),
      dataBase = localStorage.getItem("dataBase"),
      dataBaseObject = JSON.parse(dataBase),
      siteHashMap = dataBaseObject || [
        {logo: 'A', url: 'https://www.acfun.cn'},
        {logo: 'B', url: 'https://www.bilibili.com'}
      ];

const replaceUrl = (url) => {
    return url.replace('https://','')
            .replace('http://','')
            .replace('www.','')
            .replace(/\/.*/,'');
}

const render = () => {
    $siteList.find('li:not(.last)').remove();
    siteHashMap.forEach((hashMap,index) => {
        const $li = $(`<li>
        <div class="site">
          <div class="logo">${hashMap.logo}</div>
          <div class="link">${replaceUrl(hashMap.url)}</div>
          <div class="close">
          <svg class="icon">
            <use xlink:href="#icon-close"></use>
          </svg>
        </div>
        </div>
      </li>`).insertBefore($lastLi);
      $li.on('click',()=>{
        window.open(hashMap.url);
      });
      $li.on('click','.close',(e)=>{
        e.stopPropagation();
        siteHashMap.splice(index,1);
        render();
      });
    });
}
render();

$(".add-btn").on('click',()=>{
    let url = window.prompt('请添加网址？');
    if(url.indexOf("http") !== 0){
        url = "https://"+url;
    }
    console.log(url);
    siteHashMap.push({
      logo: replaceUrl(url)[0].toUpperCase(),
      url: url
    })
    render();
});

window.onbeforeunload = ()=>{
    const string = JSON.stringify(siteHashMap);
    localStorage.setItem('dataBase',string);
}

$(document).on('keypress',(e)=>{
    const {key} = e;
    for (let i = 0; i < siteHashMap.length; i++) {
        if (siteHashMap[i].logo.toLowerCase() === key) {
          window.open(dataBaseObject[i].url)
        }
      }
});