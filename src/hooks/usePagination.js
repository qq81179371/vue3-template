export default (listQuery, getList) => {
  const handleCurrentChange = size => {
    listQuery.page = size
    getList()
  }

  return {
    handleCurrentChange
  }
}
