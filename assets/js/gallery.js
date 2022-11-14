function shuffle(array) {
    let currentIndex = array.length, randomIndex;
  
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

let arr = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10
];

shuffle(arr);

let gallery = document.querySelector('.gallery');

let i = 0;

let children = Array.prototype.slice.call(gallery.children)

children.forEach(c => {
    if(i < 10) {
        c.src = "/assets/i/gallery (" + arr[i] + ").png";

        i = i + 1;
    }
});

const sleep = s => new Promise(r => setTimeout(r, Math.round(s*1000)));

async function scrollGallery () {
    let newGallery = document.querySelector('.gallery');
    let newChildren = Array.prototype.slice.call(newGallery.children)

    newChildren[0].classList.add('scrollLeft');

    await sleep(2.3);

    newChildren[0].classList.remove('scrollLeft');
    newGallery.insertBefore(newChildren[0], newChildren[newChildren.length]);
}

let galleryScroll = setInterval(scrollGallery, 7000);