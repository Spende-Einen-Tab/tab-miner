module.exports = {

  isActive: function(root_path, path) {
    if(root_path === path){
      return 'active';
    }
  }
}
