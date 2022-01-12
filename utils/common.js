const convertSortQueryStringToMongooseSort = (st) => {
  const parse = st?.split?.(':')

  if (parse?.length !== 2) {
    return {}
  }

  if (['asc', 'desc'].includes(parse[1])) {
    return {
      [parse[0]]: parse[1]
    }
  }

  return {}
}

module.exports = {
  convertSortQueryStringToMongooseSort
}
