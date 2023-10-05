let img;
let rotationSlider;
let binaryImg;
let rotationAngle = 0;
let downloadButton;

function preload() {
  img = loadImage('test5.png'); // 회전시킬 이미지 파일을 로드하세요.
}

function setup() {
  createCanvas(img.width, img.height);
  
  rotationSlider = createSlider(-150,1000, 0); // 슬라이더를 생성하고 범위를 설정하세요.
  rotationSlider.position(10, 10);
  
  binaryImg = createImage(img.width, img.height); // 이진화된 이미지를 담을 객체 생성
  fill(255);
  noStroke();
  
  // 다운로드 버튼 생성
  downloadButton = createButton('다운로드');
  downloadButton.position(10, 40);
  downloadButton.mousePressed(saveImage);
}

function draw() {
  let newRotationAngle = radians(rotationSlider.value() / 8); // 슬라이더 값에 따라 각도를 계산
  
  // 슬라이더 값이 변경된 경우에만 이미지를 회전
  if (newRotationAngle !== rotationAngle) {
    rotationAngle = newRotationAngle;
    
    // 이진화된 이미지 생성
    binaryImg.loadPixels();
    img.loadPixels();
    for (let i = 0; i < img.pixels.length; i += 4) {
      // 각 픽셀의 밝기 계산 (흑백 이미지를 위해)
      let brightness = (img.pixels[i] + img.pixels[i + 1] + img.pixels[i + 2]) / 3;
      if (brightness > 127) {
        binaryImg.pixels[i] = 255; // 밝은 부분을 흰색으로 설정
        binaryImg.pixels[i + 1] = 255;
        binaryImg.pixels[i + 2] = 255;
        binaryImg.pixels[i + 3] = 255;
      } else {
        binaryImg.pixels[i] = 0; // 어두운 부분을 검은색으로 설정
        binaryImg.pixels[i + 1] = 0;
        binaryImg.pixels[i + 2] = 0;
        binaryImg.pixels[i + 3] = 255;
      }
    }
    binaryImg.updatePixels();
    
    clear(); // 새로운 프레임을 그릴 때마다 화면을 지웁니다.
    translate(width / 2, height / 2); // 이미지의 중심으로 이동
    rotate(rotationAngle); // 이미지 회전
    image(binaryImg, -binaryImg.width / 2, -binaryImg.height / 2); // 이진화된 이미지를 다시 그립니다.
  }
}

function saveImage() {
  saveCanvas('rotated_binary_image', 'png'); // 회전된 이진화 이미지를 PNG 파일로 다운로드합니다.
}