import * as THREE from 'three'
import {
    OrbitControls
} from 'three/examples/jsm/controls/OrbitControls.js';

import {
    WEBGL
} from './webgl'

if (WEBGL.isWebGLAvailable()) {
    // 장면
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    // 카메라
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 2;

    // 렌더러
    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // 카메라 이후에 등장필요
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.update();


    // 빛
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(0, 2, 12);
    scene.add(pointLight);


    // 텍스처 추가
    const textureLoader = new THREE.TextureLoader();
    //텍스처 로더 추가
    const textureBaseColor = textureLoader.load('../static/img/stone_basecolor.jpg');
    //텍스처 이미지 불러오기
    const textureNormalMap = textureLoader.load('../static/img/stone_normal.jpg');
    const textureHeightMap = textureLoader.load('../static/img/stone_height.png');
    const textureRoughnessMap = textureLoader.load('../static/img/stone_roughness.jpg');

    // 도형 추가
    const geometry = new THREE.SphereGeometry(0.3, 32, 16);
    // const geometry = new THREE.PlaneGeometry(1, 1);
    const material01 = new THREE.MeshStandardMaterial({
        map: textureBaseColor
    });
    const obj01 = new THREE.Mesh(geometry, material01);
    obj01.position.x = -1.5;
    scene.add(obj01);

    const material02 = new THREE.MeshStandardMaterial({
        map: textureBaseColor,
        normalMap: textureNormalMap
    });

    const obj02 = new THREE.Mesh(geometry, material02);
    obj02.position.x = -0.5;
    scene.add(obj02);


    const material03 = new THREE.MeshStandardMaterial({
        map: textureBaseColor,
        normalMap: textureNormalMap,
        displacementMap: textureHeightMap,
        // displacementMap 메쉬 정점의 위치를 밝고 어두움에 따라 조절하는 것.
        displacementScale: 0.08
    });
    const obj03 = new THREE.Mesh(geometry, material03);
    obj03.position.x = 0.5;
    scene.add(obj03);


    const material04 = new THREE.MeshStandardMaterial({
        map: textureBaseColor,
        normalMap: textureNormalMap,
        displacementMap: textureHeightMap,
        displacementScale: 0.08,
        roughnessMap: textureRoughnessMap,
        roughness: 0.6
        //재질 빛 질감
    });
    const obj04 = new THREE.Mesh(geometry, material04);
    obj04.position.x = 1.5;
    scene.add(obj04);

    function render(time) {
        time *= 0.001; // convert time to seconds
        renderer.render(scene, camera);
        requestAnimationFrame(render); //인자로 받은 함수 animate를 반복 실행
    }

    requestAnimationFrame(render);

    // 반응형 처리
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', onWindowResize);

} else {
    var warning = WEBGL.getWebGLErrorMessage();
    document.body.appendChild(warning);
}