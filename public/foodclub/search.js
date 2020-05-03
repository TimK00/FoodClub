/**
 * Basic search function.
 *
 */

function searchList() {
    var input, filter, li, i, list, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    list = document.getElementsByTagName("span");
    li = document.getElementsByTagName("li");

    for (i = 0; i < list.length; i++) {

        txtValue = list[i].parentElement.childNodes[1].textContent;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            $(list[i].parentElement).attr("style", "display: ;");
        } else {
            $(list[i].parentElement).attr("style", "display: none !important;")
        }
    }
  };