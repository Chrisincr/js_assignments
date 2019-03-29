function DoGit(){
  $.get("https://api.github.com/users/chrisincr", displayName)

}
function displayName(data) {
  
  let page =''
  for (key in data){
    page += key + ": " +data[key] + "<br>"
  }
  $('#gitresult').html(page)
}

