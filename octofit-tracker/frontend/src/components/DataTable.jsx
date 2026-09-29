function DataTable({ title, loading, error, items, columns }) {
  return (
    <section>
      <h2 className="mb-4">{title}</h2>
      {loading && <div className="spinner-border text-success" role="status"><span className="visually-hidden">Loading...</span></div>}
      {error && <div className="alert alert-danger">Could not load {title.toLowerCase()}: {error}</div>}
      {!loading && !error && items.length === 0 && <div className="alert alert-info">No {title.toLowerCase()} found.</div>}
      {!loading && !error && items.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                {columns.map((column) => <th key={column.header} scope="col">{column.header}</th>)}
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item._id ?? item.id ?? index}>
                  {columns.map((column) => <td key={column.header}>{column.render(item, index)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default DataTable
