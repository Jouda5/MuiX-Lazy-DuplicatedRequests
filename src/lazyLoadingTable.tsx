import * as React from "react";
import {
  DataGridPremium,
  type GridDataSource,
  type GridGetRowsParams,
} from "@mui/x-data-grid-premium";

function ServerSideLazyLoadingViewport() {
  const dataSource: GridDataSource = React.useMemo(
    () => ({
      getRows: async (params: GridGetRowsParams) => {
        const urlParams = new URLSearchParams({
          start: `${params.start}`,
          end: `${params.end}`,
        });
        const response = await fetch(
          `http://localhost:3001/api/users/usersLazy?${urlParams.toString()}`
        );

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();

        return {
          rows: data.items,
          rowCount: data.totalCount,
        };
      },
    }),
    []
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <div style={{ width: "100%", height: 800 }}>
        <DataGridPremium
          dataSource={dataSource}
          lazyLoading
          paginationModel={{ page: 0, pageSize: 100 }}
          columns={[
            {
              field: "id",
              headerName: "ID",
              width: 150,
            },
            {
              field: "userName",
              headerName: "Name",
              width: 200,
            },
            {
              field: "userEmail",
              headerName: "Email",
              width: 200,
            },
          ]}
          onDataSourceError={(error) =>
            console.error("Error fetching data:", error)
          }
        />
      </div>
    </div>
  );
}

export default ServerSideLazyLoadingViewport;
