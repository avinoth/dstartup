$ ->
  umm = 'd96b535e49275e48b04caa5c5df186b4c8d3f09b36672a65'
  url = 'https://api.angel.co/1'

  searchStartups = ->
    alphabets = 'abcdefghijklmnopqurstuvwxyz'
    rand = alphabets.substr( Math.floor(Math.random() * 26), 1)
    searchURL = "#{url}/search/?query=#{rand}&type=Startup&access_token=#{umm}"
    $.ajax
      url: searchURL
      type: 'GET'
      dataType: 'JSONP'
      success: (data) ->
        fetchRandom data

  fetchRandom = (data) ->
    startup = data[Math.floor(Math.random()*data.length)]
    startupURL = "#{url}/startups/#{startup.id}?access_token=#{umm}"
    $.ajax
      url: startupURL
      type: 'GET'
      dataType: 'JSONP'
      success: (sdata) ->
        alterPage sdata.name, sdata.company_url, sdata.product_desc

  alterPage = (name, url, description) ->
    $('#name').text(name)
    $('#url').text(url)
    $('#desc').text(description)

  $('#explorer').on 'click', (e) ->
    searchStartups()
