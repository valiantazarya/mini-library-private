const CustomResp = (response_num, response_msg, response_data) => {
  if (response_num == 200 || response_num == 201) {
    return ({
      "status": "success",
      "error_message": response_msg || null,
      "data": response_data
    })
  }
  else {
    return ({
      "status": "failed",
      "error_message": response_msg,
      "data": response_data || null
    })
  }
}

module.exports = CustomResp;