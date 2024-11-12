import "./NewPage.css";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Lable from "@mui/material/FormLabel";
import React, { useState } from "react";

const RouteTable = ({ routes }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Функция для поиска
  const filteredRoutes = routes.filter(
    (route) =>
      route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.departureTime.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.arrivalTime.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Функция для сортировки
  const sortedRoutes = [...filteredRoutes].sort((a, b) => {
    if (sortConfig.key === null) return 0;
    const aValue = a[sortConfig.key].toLowerCase();
    const bValue = b[sortConfig.key].toLowerCase();

    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  // Обработка клика по заголовку для сортировки
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };
  const options = ["Чаусы-Могилев", "Чаусы-Могилев 2", "Чаусы-Могилев 3"];

  return (
    <div>
      <Autocomplete
        options={options}
        sx={{
          maxWidth: 250,
          marginLeft: 0,
          marginBottom: 20,
          display: "block",
          margin: "auto",
        }}
        renderInput={(params) => <TextField {...params} label="Маршрут" />}
      />

      <h2>Таблица маршрутов</h2>
      <input
        type="text"
        placeholder="Поиск по таблице..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div style={{ height: "300px", overflowY: "auto", marginTop: "20px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th
                onClick={() => handleSort("name")}
                style={{ cursor: "pointer" }}
              >
                Название маршрута
              </th>
              <th
                onClick={() => handleSort("departureTime")}
                style={{ cursor: "pointer" }}
              >
                Время отправления
              </th>
              <th
                onClick={() => handleSort("arrivalTime")}
                style={{ cursor: "pointer" }}
              >
                Время прибытия
              </th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {sortedRoutes.map((route, index) => (
              <tr key={index}>
                <td>{route.name}</td>
                <td>{route.departureTime}</td>
                <td>{route.arrivalTime}</td>
                <td>
                  <button
                    onClick={() => alert(`Изменить маршрут: ${route.name}`)}
                  >
                    Изменить
                  </button>
                  <button
                    onClick={() => alert(`Удалить маршрут: ${route.name}`)}
                  >
                    Удалить
                  </button>
                  <button
                    onClick={() =>
                      alert(`Полная информация о маршруте: ${route.name}`)
                    }
                  >
                    Информация
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Пример данных
const routes = [
  { name: "Маршрут 1", departureTime: "10:00", arrivalTime: "12:00" },
  { name: "Маршрут 2", departureTime: "13:00", arrivalTime: "15:00" },
  { name: "Маршрут 3", departureTime: "09:00", arrivalTime: "11:00" },
  { name: "Маршрут 4", departureTime: "14:00", arrivalTime: "16:00" },
  { name: "Маршрут 5", departureTime: "17:00", arrivalTime: "19:00" },
  { name: "Маршрут 1", departureTime: "10:00", arrivalTime: "12:00" },
  { name: "Маршрут 2", departureTime: "13:00", arrivalTime: "15:00" },
  { name: "Маршрут 3", departureTime: "09:00", arrivalTime: "11:00" },
  { name: "Маршрут 4", departureTime: "14:00", arrivalTime: "16:00" },
  { name: "Маршрут 5", departureTime: "17:00", arrivalTime: "19:00" },
  { name: "Маршрут 1", departureTime: "10:00", arrivalTime: "12:00" },
  { name: "Маршрут 2", departureTime: "13:00", arrivalTime: "15:00" },
  { name: "Маршрут 3", departureTime: "09:00", arrivalTime: "11:00" },
  { name: "Маршрут 4", departureTime: "14:00", arrivalTime: "16:00" },
  { name: "Маршрут 5", departureTime: "17:00", arrivalTime: "19:00" },
  { name: "Маршрут 1", departureTime: "10:00", arrivalTime: "12:00" },
  { name: "Маршрут 2", departureTime: "13:00", arrivalTime: "15:00" },
  { name: "Маршрут 3", departureTime: "09:00", arrivalTime: "11:00" },
  { name: "Маршрут 4", departureTime: "14:00", arrivalTime: "16:00" },
  { name: "Маршрут 5", departureTime: "17:00", arrivalTime: "19:00" },
  { name: "Маршрут 1", departureTime: "10:00", arrivalTime: "12:00" },
  { name: "Маршрут 2", departureTime: "13:00", arrivalTime: "15:00" },
  { name: "Маршрут 3", departureTime: "09:00", arrivalTime: "11:00" },
  { name: "Маршрут 4", departureTime: "14:00", arrivalTime: "16:00" },
  { name: "Маршрут 5", departureTime: "17:00", arrivalTime: "19:00" },
  { name: "Маршрут 1", departureTime: "10:00", arrivalTime: "12:00" },
  { name: "Маршрут 2", departureTime: "13:00", arrivalTime: "15:00" },
  { name: "Маршрут 3", departureTime: "09:00", arrivalTime: "11:00" },
  { name: "Маршрут 4", departureTime: "14:00", arrivalTime: "16:00" },
  { name: "Маршрут 5", departureTime: "17:00", arrivalTime: "19:00" },
];

// Основной компонент приложения
function NewPage1() {
  return <RouteTable routes={routes} />;
}

export default NewPage1;

// import React from "react";
// import PropTypes from "prop-types";
// import { alpha } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TablePagination from "@mui/material/TablePagination";
// import TableRow from "@mui/material/TableRow";
// import TableSortLabel from "@mui/material/TableSortLabel";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import Paper from "@mui/material/Paper";
// import Checkbox from "@mui/material/Checkbox";
// import IconButton from "@mui/material/IconButton";
// import Tooltip from "@mui/material/Tooltip";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Switch from "@mui/material/Switch";
// import DeleteIcon from "@mui/icons-material/Delete";
// import FilterListIcon from "@mui/icons-material/FilterList";
// import { visuallyHidden } from "@mui/utils";

// function createData(id, name, calories, fat, carbs, protein) {
//   return {
//     id,
//     name,
//     calories,
//     fat,
//     carbs,
//     protein,
//   };
// }

// const rows = [
//   createData(1, "Cupcake", 305, 3.7, 67, 4.3),
//   createData(2, "Donut", 452, 25.0, 51, 4.9),
//   createData(3, "Eclair", 262, 16.0, 24, 6.0),
//   createData(4, "Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData(5, "Gingerbread", 356, 16.0, 49, 3.9),
//   createData(6, "Honeycomb", 408, 3.2, 87, 6.5),
//   createData(7, "Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData(8, "Jelly Bean", 375, 0.0, 94, 0.0),
//   createData(9, "KitKat", 518, 26.0, 65, 7.0),
//   createData(10, "Lollipop", 392, 0.2, 98, 0.0),
//   createData(11, "Marshmallow", 318, 0, 81, 2.0),
//   createData(12, "Nougat", 360, 19.0, 9, 37.0),
//   createData(13, "Oreo", 437, 18.0, 63, 4.0),
// ];

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === "desc"
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// const headCells = [
//   {
//     id: "name",
//     numeric: false,
//     disablePadding: true,
//     label: "Dessert (100g serving)",
//   },
//   {
//     id: "calories",
//     numeric: true,
//     disablePadding: false,
//     label: "Calories",
//   },
//   {
//     id: "fat",
//     numeric: true,
//     disablePadding: false,
//     label: "Fat (g)",
//   },
//   {
//     id: "carbs",
//     numeric: true,
//     disablePadding: false,
//     label: "Carbs (g)",
//   },
//   {
//     id: "protein",
//     numeric: true,
//     disablePadding: false,
//     label: "Protein (g)",
//   },
// ];

// function EnhancedTableHead(props) {
//   const {
//     onSelectAllClick,
//     order,
//     orderBy,
//     numSelected,
//     rowCount,
//     onRequestSort,
//   } = props;
//   const createSortHandler = (property) => (event) => {
//     onRequestSort(event, property);
//   };

//   return (
//     <TableHead>
//       <TableRow>
//         <TableCell padding="checkbox">
//           <Checkbox
//             color="primary"
//             indeterminate={numSelected > 0 && numSelected < rowCount}
//             checked={rowCount > 0 && numSelected === rowCount}
//             onChange={onSelectAllClick}
//             inputProps={{
//               "aria-label": "select all desserts",
//             }}
//           />
//         </TableCell>
//         {headCells.map((headCell) => (
//           <TableCell
//             key={headCell.id}
//             align={headCell.numeric ? "right" : "left"}
//             padding={headCell.disablePadding ? "none" : "normal"}
//             sortDirection={orderBy === headCell.id ? order : false}
//           >
//             <TableSortLabel
//               active={orderBy === headCell.id}
//               direction={orderBy === headCell.id ? order : "asc"}
//               onClick={createSortHandler(headCell.id)}
//             >
//               {headCell.label}
//               {orderBy === headCell.id ? (
//                 <Box component="span" sx={visuallyHidden}>
//                   {order === "desc" ? "sorted descending" : "sorted ascending"}
//                 </Box>
//               ) : null}
//             </TableSortLabel>
//           </TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//   );
// }

// EnhancedTableHead.propTypes = {
//   numSelected: PropTypes.number.isRequired,
//   onRequestSort: PropTypes.func.isRequired,
//   onSelectAllClick: PropTypes.func.isRequired,
//   order: PropTypes.oneOf(["asc", "desc"]).isRequired,
//   orderBy: PropTypes.string.isRequired,
//   rowCount: PropTypes.number.isRequired,
// };

// function EnhancedTableToolbar(props) {
//   const { numSelected } = props;
//   return (
//     <Toolbar
//       sx={[
//         {
//           pl: { sm: 2 },
//           pr: { xs: 1, sm: 1 },
//         },
//         numSelected > 0 && {
//           bgcolor: (theme) =>
//             alpha(
//               theme.palette.primary.main,
//               theme.palette.action.activatedOpacity
//             ),
//         },
//       ]}
//     >
//       {numSelected > 0 ? (
//         <Typography
//           sx={{ flex: "1 1 100%" }}
//           color="inherit"
//           variant="subtitle1"
//           component="div"
//         >
//           {numSelected} selected
//         </Typography>
//       ) : (
//         <Typography
//           sx={{ flex: "1 1 100%" }}
//           variant="h6"
//           id="tableTitle"
//           component="div"
//         >
//           Nutrition
//         </Typography>
//       )}
//       {numSelected > 0 ? (
//         <Tooltip title="Delete">
//           <IconButton>
//             <DeleteIcon />
//           </IconButton>
//         </Tooltip>
//       ) : (
//         <Tooltip title="Filter list">
//           <IconButton>
//             <FilterListIcon />
//           </IconButton>
//         </Tooltip>
//       )}
//     </Toolbar>
//   );
// }

// EnhancedTableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };

// export default function EnhancedTable() {
//   const [order, setOrder] = React.useState("asc");
//   const [orderBy, setOrderBy] = React.useState("calories");
//   const [selected, setSelected] = React.useState([]);
//   const [page, setPage] = React.useState(0);
//   const [dense, setDense] = React.useState(false);
//   const [rowsPerPage, setRowsPerPage] = React.useState(5);

//   const handleRequestSort = (event, property) => {
//     const isAsc = orderBy === property && order === "asc";
//     setOrder(isAsc ? "desc" : "asc");
//     setOrderBy(property);
//   };

//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelected = rows.map((n) => n.id);
//       setSelected(newSelected);
//       return;
//     }
//     setSelected([]);
//   };

//   const handleClick = (event, id) => {
//     const selectedIndex = selected.indexOf(id);
//     let newSelected = [];

//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, id);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1)
//       );
//     }
//     setSelected(newSelected);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleChangeDense = (event) => {
//     setDense(event.target.checked);
//   };

//   // Avoid a layout jump when reaching the last page with empty rows.
//   const emptyRows =
//     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

//   const visibleRows = React.useMemo(
//     () =>
//       [...rows]
//         .sort(getComparator(order, orderBy))
//         .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
//     [order, orderBy, page, rowsPerPage]
//   );

//   return (
//     <div>
//       <Box sx={{ width: "100%" }}>
//         <Paper sx={{ width: "100%", mb: 2 }}>
//           <EnhancedTableToolbar numSelected={selected.length} />
//           <TableContainer>
//             <Table
//               sx={{ minWidth: 750 }}
//               aria-labelledby="tableTitle"
//               size={dense ? "small" : "medium"}
//             >
//               <EnhancedTableHead
//                 numSelected={selected.length}
//                 order={order}
//                 orderBy={orderBy}
//                 onSelectAllClick={handleSelectAllClick}
//                 onRequestSort={handleRequestSort}
//                 rowCount={rows.length}
//               />
//               <TableBody>
//                 {visibleRows.map((row, index) => {
//                   const isItemSelected = selected.includes(row.id);
//                   const labelId = `enhanced-table-checkbox-${index}`;

//                   return (
//                     <TableRow
//                       hover
//                       onClick={(event) => handleClick(event, row.id)}
//                       role="checkbox"
//                       aria-checked={isItemSelected}
//                       tabIndex={-1}
//                       key={row.id}
//                       selected={isItemSelected}
//                       sx={{ cursor: "pointer" }}
//                     >
//                       <TableCell padding="checkbox">
//                         <Checkbox
//                           color="primary"
//                           checked={isItemSelected}
//                           inputProps={{
//                             "aria-labelledby": labelId,
//                           }}
//                         />
//                       </TableCell>
//                       <TableCell
//                         component="th"
//                         id={labelId}
//                         scope="row"
//                         padding="none"
//                       >
//                         {row.name}
//                       </TableCell>
//                       <TableCell align="right">{row.calories}</TableCell>
//                       <TableCell align="right">{row.fat}</TableCell>
//                       <TableCell align="right">{row.carbs}</TableCell>
//                       <TableCell align="right">{row.protein}</TableCell>
//                     </TableRow>
//                   );
//                 })}
//                 {emptyRows > 0 && (
//                   <TableRow
//                     style={{
//                       height: (dense ? 33 : 53) * emptyRows,
//                     }}
//                   >
//                     <TableCell colSpan={6} />
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <TablePagination
//             rowsPerPageOptions={[5, 10, 25]}
//             component="div"
//             count={rows.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </Paper>
//         <FormControlLabel
//           control={<Switch checked={dense} onChange={handleChangeDense} />}
//           label="Dense padding"
//         />
//       </Box>

//       <table>
//         <thead>
//           <tr>
//             <th>Пн</th>
//             <th>Вт</th>
//             <th>Ср</th>
//             <th>Чт</th>
//             <th>Пт</th>
//             <th>Сб</th>
//             <th>Вс</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>
//               <input type="checkbox" />
//             </td>
//             <td>
//               <input type="checkbox" />
//             </td>
//             <td>
//               <input type="checkbox" />
//             </td>
//             <td>
//               <input type="checkbox" />
//             </td>
//             <td>
//               <input type="checkbox" />
//             </td>
//             <td>
//               <input type="checkbox" />
//             </td>
//             <td>
//               <input type="checkbox" />
//             </td>
//           </tr>
//         </tbody>
//       </table>

{
  /* <form className="FormAddRoute">
          <h2>Добавить маршрут</h2>
          <Input
            type="text"
            name="startCity"
            value={formData.startCity}
            onChange={handleChange}
            required
          />
          <Lable>Город отправления:</Lable>

          <Input
            type="text"
            name="finishCity"
            value={formData.finishCity}
            onChange={handleChange}
            required
          />
          <Lable>Город назначения:</Lable>

          <Input type="number"></Input>

          <Lable>Расстояние между городами</Lable>
          <Button type="submit">Сохранить</Button>
        </form> */
}

{
  /* <form className="FormAddRoute">
          <h2>Назначить рассписание</h2>
          <p name="startFinishCity" onChange={handleChange}>
            {displayTextCity}
          </p>
          <p name="startFinishTime" onChange={handleChange}>
            {displayTextTime}
          </p>
          <div className="containerSchedule">
            <div className="FlexDiv">
              <Lable>Понедельник</Lable>
              <Checkbox
                name="isInMonday"
                checked={formData.isInMonday} // Используем checked вместо value
                onChange={handleChange}
              />
            </div>

            <div className="FlexDiv">
              <Lable>Вторник</Lable>
              <Checkbox
                name="isInTuesday"
                checked={formData.isInTuesday}
                onChange={handleChange}
              />
            </div>
            <div className="FlexDiv">
              <Lable>Среда</Lable>
              <Checkbox
                name="isInWednesday"
                checked={formData.isInWednesday}
                onChange={handleChange}
              />
            </div>
            <div className="FlexDiv">
              <Lable>Четверг</Lable>
              <Checkbox
                name="isInThursday"
                checked={formData.isInThursday}
                onChange={handleChange}
              />
            </div>
            <div className="FlexDiv">
              <Lable>Пятница</Lable>
              <Checkbox
                name="isInFriday"
                checked={formData.isInFriday}
                onChange={handleChange}
              />
            </div>
            <div className="FlexDiv">
              <Lable>Суббота</Lable>
              <Checkbox
                name="isInSaturday"
                checked={formData.isInSaturday}
                onChange={handleChange}
              />
            </div>
            <div className="FlexDiv">
              <Lable>Воскресенье</Lable>
              <Checkbox
                name="isInSunday"
                checked={formData.isInSunday}
                onChange={handleChange}
              />
            </div>
          </div>
          <div></div>
          <Button type="submit">Сохранить</Button>
        </form>

        <form className="FormAddRoute" onSubmit={handleSubmit}>
          <h2>Добавить маршрут</h2>
          <Input
            type="text"
            name="startCity"
            value={formData.startCity}
            onChange={handleChange}
            required
          />
          <Lable>Город отправления:</Lable>

          <Input
            type="time"
            name="finishTime"
            value={formData.finishTime}
            onChange={handleChange}
            required
          />
          <Lable>Время прибытия:</Lable>

          <Input
            type="number"
            name="countPlace"
            value={formData.countPlace}
            onChange={handleChange}
            required
          />
          <Lable>Количество мест:</Lable>

          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Lable>Место отправления:</Lable>
          <Input
            type="text"
            name="placeOfSeat"
            value={formData.placeOfSeat}
            onChange={handleChange}
            required
          />
          <Lable>Название:</Lable>

          <Input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <Lable>Цена:</Lable>

          <Input
            type="number"
            name="platformNumber"
            value={formData.platformNumber}
            onChange={handleChange}
            required
          />
          <Lable>Номер платформы:</Lable>

          <Input
            type="text"
            name="placeAdress"
            value={formData.placeAdress}
            onChange={handleChange}
            required
          />
          <Lable>Адрес места:</Lable>

          <Button type="submit">
            {editIndex !== null ? "Сохранить изменения" : "Добавить карточку"}
          </Button>
        </form> */
}
//     </div>
//   );
// }
