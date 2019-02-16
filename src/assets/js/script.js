function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export const token = getCookie("token")

// export function saveResults(url, results, successResponse, errorResponse) {
//   $.ajax({
//     type: "POST",
//     url: url,
//     headers: {
//       Authorization: "Token " + token
//     },
//     contentType: "application/json; charset=utf-8",
//     dataType: "json",
//     data: JSON.stringify(results),
//     success: response => successResponse(response),
//     error: response => errorResponse(response),
//   })
// }
//
// export function getResults(url, successResponse, errorResponse) {
//   $.ajax({
//     type: "GET",
//     url: url,
//     headers: {
//       Authorization: "Token " + token
//     },
//     success: response => successResponse(response),
//     error: response => errorResponse(response),
//   })
// }

// Change React Component state with global object properties
// To use this function, you must add ref={ref => {window.<nameOfComponentRef> = ref}} when you call Component
// Then you can call onPropertyChange function for EVERY property of global object what you need
// It updates your Component's state when you set value to global object
// obj       – global object                 (Object)
// prop      – name of property              (String)
// component – ref's name of React Component (String)
// state     – name of React Component state (String)

export function onPropertyChange(obj, prop, component, state){
  if (obj.hasOwnProperty(prop)) {
    let originalVal = obj[prop]
    Object.defineProperty(obj, prop, {
      get: function() { return originalVal },
      set: function(val) {
        window[component].setState({[state]: val})
        return originalVal = val;
      }
    });
  }
}
