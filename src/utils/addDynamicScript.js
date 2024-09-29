const addDynamicScript = async url => {
  try {
    const script = await document.createElement('script')

    script.src = url
    await document.body.appendChild(script)
    console.log('script success to load')

    return true
  } catch (error) {
    console.log('script failed to load')
    console.log(error)
  }
}

export default addDynamicScript
