import { module } from 'angular';
import "../../../node_modules/webcam/dist/webcam.min.js";

import snapMeComponent from './snap-me.component';
// import CameraService from './shared/camera.service';
//import cameraConfigure from './camera.config';

const SnapMe = module('snapMe', ['webcam'])
    .component('snapMe', snapMeComponent)
    //.config(cameraConfigure)
    // .service("CameraService", CameraService)
    .name;

export default SnapMe;