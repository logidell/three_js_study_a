import * as THREE from 'three'
import {WEBGL} from './webgl'


if (WEBGL.isWebGLAvailable()) {

    /*
        제 03강
    - three js / 블렌더의 간단한 구조

    카메라 // 장면 [3d Obj 묶음]  //  렌더러 /viewPort

    렌더러 renderer :  카메라에 담긴 장면을 구현해주는 역할
    장면 Scene : 말 그대로 장면. 배경, 안개요소등 포함해 여러 물체들과 빛이 모인 장면
        -> 최상위 노드이다.
    카메라 Camera : 장면을 화면에 담기 위한 카메라. 시야각, 종횡비, 카메라 끝 지점, 카메라 위치 등등을 설정한다.

     */


    // 장면
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    // 카메라
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 3;

    // 제 03강
    // const camera = new THREE.PerspectiveCamera(fov[각도] ,
    // aspect[화면 범주 /  window.innerWidth / window.innerHeight = window안의 크기대로 맞춤], near , far [거리의 가까움, 멈] 순으로 작성);


    // // 캔버스
    // const canvas = document.querySelector('#three01');


    // 렌더러
    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        // 배경 제거
        antialias: true
    //    계단현상 제거
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // 빛
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(0, 2, 12);
    scene.add(pointLight);



    // 제 03강
    // const renderer = new THREE.WebGLRenderer({canvas});
    // renderer.setSize(window.innerWidth, window.innerHeight);

    // document.body.appendChild(renderer.domElement);
    //  -> 간단하게 실행하는 방법


    // ----------- 도형01 추가 -----------

    const geometry01 = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    // geometry 01에 대한 값을 불러옴
    // const geometry01 = new THREE.BoxGeometry[이 함수는 공식 문서에 작성된 함수 사용하기 ](0.5, 0.5, 0.5);
    const material01 = new THREE.MeshBasicMaterial({color: 0xCFE2F3});
    //특정 재질에 대한 값(색상) 설정
    const obj01 = new THREE.Mesh(geometry01, material01);
    // geometry와 재질(Material)을 변수명에 담고 그 값을 메쉬에 넣는다.

    obj01.position.x = -2;
    //geometry와 재질을 메쉬에 담은 변수 obj01을 불러낼 위치를 설정
    scene.add(obj01);
    //설정된 위치를 scene에 담는다.

    //실행 했을 경우 코드가 문제 없이 잘 돌았을 때 위치 설정을 다시 해보자.
    // - > 카메라 위치, 물체 위치를 잘 설정해야한다.



    // geometry = 기하학 = 도형의 성질
    /**
     * BoxGeometry : 정육면체
     * CapsuleGeometry : 반지름, 높이를 가진 캡슐형상
     * Circle Geometry : 원판 / Segment에 따라 모양이 변한다. 이 함수의 Segment의 최소값은 3, 기본 값은 32다.
     * - three js 기본문서에 사용할 수 있는 종류가 geometrys에 정리되어 있다.
     */


    //
    /** Material 재질
     * MeshBasicMaterial : 조명의 영향을 받지 않는 재질
     *
     * MeshDepthMaterial
     */


        // ----------- 도형02 추가 -----------
    const geometry02 = new THREE.ConeGeometry(0.4, 0.7, 6);
    const material02 = new THREE.MeshStandardMaterial({color: 0x6FA8DC});
    const obj02 = new THREE.Mesh(geometry02, material02);
    obj02.position.x = -1;
    scene.add(obj02);

    // ----------- 도형03 추가 -----------
    const geometry03 = new THREE.IcosahedronGeometry(0.4, 0);
    const material03 = new THREE.MeshStandardMaterial({
        color: 0xFF7F00,
        metalness : 0.9, //광택감
        roughness : 0.5, // 물체의 거칠기,
        transparent : true, // 물체의 투명도 기본값 t / f
        opacity : 0.3 // 흰색(색깔) 기준 투명도
    });
    const obj03 = new THREE.Mesh(geometry03, material03);
    obj03.position.x = 0;
    scene.add(obj03);

    const geometry04 = new THREE.IcosahedronGeometry(0.4, 0);
    const material04 = new THREE.MeshStandardMaterial({
        color: 0xFF7F00,
        metalness : 0.9, //광택감
        roughness : 0.5, // 물체의 거칠기,
        transparent : true, // 물체의 투명도 기본값 t / f
        opacity : 0.3, // 흰색(색깔) 기준 투명도
        wireframe : true //기본값 t / f
    });
    const obj04 = new THREE.Mesh(geometry04, material04);
    obj04.position.x = 1;
    scene.add(obj04);



    const geometry05 = new THREE.IcosahedronGeometry(0.4, 0);
    const material05 = new THREE.MeshDepthMaterial({
        color: 0xFF7F00,
        // metalness : 0.9, //광택감
        // roughness : 0.5, // 물체의 거칠기,
        // transparent : true, // 물체의 투명도 기본값 t / f
        // opacity : 0.3, // 흰색(색깔) 기준 투명도
    });
    const obj05 = new THREE.Mesh(geometry05, material05);
    obj05.position.x = 2;
    scene.add(obj05);



    /*
    렌더링을 루프로 보여줘야 할 때 사용하는 코드
     */

    function render(time) {
        time *= 0.001;  // convert time to seconds

        obj01.rotation.x = time;
        obj01.rotation.y = time;
        //도형을 time 에 담긴 변수만큼 움직이겠음.

        obj02.rotation.x = time;
        obj02.rotation.y = time;

        obj03.rotation.x = time;
        obj03.rotation.y = time;

        obj04.rotation.y = time;

        obj05.rotation.x = time;

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);


//    반응형 처리

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        // 윈도우 값 가변 처리
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', onWindowResize);

} else {
    var warning = WEBGL.getWebGLErrorMessage();
    document.body.appendChild(warning);
}