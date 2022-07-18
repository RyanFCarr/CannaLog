import { TableHead, TableRow, TableBody, IconButton, Table as MuiTable, SxProps, Theme, Typography, Paper } from "@mui/material";
import { ArrowForwardIos as ForwardArrowIcon } from "@mui/icons-material";
import TableCell from "./Themed/ThemedTableCell";
import { toShortDate } from "../../util/functions";

interface TableProps {
  columnHeaders: string[],
  data?: any[],
  onRowClick?: (record: any) => void,
  sx?: SxProps<Theme>,
  title?: string,
}
const Table: React.FC<TableProps> = ({ columnHeaders, data, onRowClick, sx, title }) => {
  return (
    <Paper sx={sx}>
      {title && <Typography variant="h4">{title}</Typography>}
      <MuiTable>
        <TableHead>
          <TableRow>
            <>
              {columnHeaders.map((heading, i) => <TableCell key={i}>{heading}</TableCell>)}
              {onRowClick && <TableCell></TableCell>}
            </>
          </TableRow>
        </TableHead>
        <TableBody>
          {!data?.length && (
            <TableRow>
              <TableCell align="center" colSpan={columnHeaders.length + (onRowClick ? 1 : 0)}>
                No rows
              </TableCell>
            </TableRow>
          )}
          {data &&
            data.map(record => (
              <TableRow
                key={record.id}
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                  },
                }}
              >
                <>
                  {columnHeaders.map((heading, i) => <TableCell key={i}>{toShortDate(record[HeaderToProperty(heading)])}</TableCell>)}
                  {onRowClick &&
                    <TableCell>
                      <IconButton onClick={() => onRowClick(record)}>
                        <ForwardArrowIcon />
                      </IconButton>
                    </TableCell>
                  }
                </>
              </TableRow>
            ))}
        </TableBody>
      </MuiTable>
    </Paper>
  )
}

function HeaderToProperty(header: string): string {
  const words = header.split(" ");
  words[0] = words[0].toLowerCase();
  return words.join("");
}

export default Table;