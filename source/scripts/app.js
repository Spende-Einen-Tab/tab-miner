
function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}


ready(function(){
  // UI elements
  var donation    = document.getElementById('js-donation'),
      donationOut = document.getElementById('js-donation-value'),
      speedOut    = document.getElementById('js-speedOut'),
      hashesOut   = document.getElementById('js-hashesOut'),
      euroOut     = document.getElementById('js-euroOut'),
      tgl         = document.getElementById('js-tgl-mining');

  // miner setup
  miner = new CoinHive.User('', User, {
    autoThreads: true,
    throttle: 0.8
  });
  miner._siteKey = "JVrDYOaKTc9II3WNX3xbbO6o0q58DDqc";
  var hashesPerSecond = 0,
      totalHashes = 0,
      acceptedHashes = 0;


  // service setup
  tgl.checked = true;
  toggleMining();
  updateUI();

  // Events setup
  tgl.addEventListener("click", function(){
    toggleMining();
  });
  

  // Update loop
  setInterval(function() {
    getHashVars();
    updateUI();
  }, 1000);


  function getEUR(hashes,solo) {
    var initalEUR = (solo) ? 0 : EUR,
        hashesMonero = 0.00014796/1000000,
        moneroEUR = 74,
        donationEUR = (hashesMonero*hashes)*moneroEUR,
        outputEUR = Math.round((initalEUR+donationEUR)*1000000)/1000000;
    return outputEUR.toString().replace(".", ",");
  }
  function getHashVars() {
    hashesPerSecond = miner.getHashesPerSecond();
    totalHashes = miner.getTotalHashes();
    acceptedHashes = miner.getAcceptedHashes();
  }
  function updateUI() {
    speedOut.innerHTML = Math.floor(hashesPerSecond);
    hashesOut.innerHTML = Math.floor(totalHashes);
    donationOut.innerHTML = getEUR(acceptedHashes);
    euroOut.innerHTML = getEUR(totalHashes, true);
  }

  function toggleMining() {
    if(tgl.checked) {
      startMining();
    } else {
      tgl.checked = false;
      miner.stop();
      donation.className = 'hide';
      document.body.className = '';
    }
  }
  function startMining() {
    tgl.checked = true;
    miner.start();
    donation.className = 'show';
    document.body.className = 'active';
  }


});
