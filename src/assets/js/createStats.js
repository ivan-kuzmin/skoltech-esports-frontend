import Stats from 'src/assets/js/stats.min';

export default function createStats() {
  const stats0 = new Stats();
  stats0.showPanel(0);
  stats0.domElement.style.cssText = 'position:absolute;top:0;left:0;z-index:2;pointer-events:none;';
  document.getElementById('canvas-container').appendChild(stats0.dom);

  // const stats1 = new Stats();
  // stats1.showPanel(1);
  // stats1.domElement.style.cssText = 'position:absolute;bottom:48px;right:0px;z-index:0;';
  // document.getElementById('canvas-container').appendChild(stats1.dom);

  return [stats0];
}
