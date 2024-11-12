import Footer from "../../Components/footer/footer";
import Header from "../../Components/header/header";
import "./AssighBus.css";

function AssignABus() {
  return (
    <div>
      <Header></Header>
      <main>
        <div>
          <table className="TableClass">
            <thead>
              <tr>
                <th
                  onClick={() => handleSort("startCity")}
                  style={{ cursor: "pointer" }}
                >
                  Город отправления
                </th>
                <th
                  onClick={() => handleSort("finishCity")}
                  style={{ cursor: "pointer" }}
                >
                  Город прибытия
                </th>
                <th
                  onClick={() => handleSort("startTime")}
                  style={{ cursor: "pointer" }}
                >
                  Время отправления
                </th>
                <th
                  onClick={() => handleSort("finishTime")}
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
                  <td>{route.startCity}</td>
                  <td>{route.finishCity}</td>
                  <td>{route.startTime}</td>
                  <td>{route.finishTime}</td>
                  <td>
                    <button onClick={() => handleEdit(index)}>Изменить</button>
                    <button onClick={() => handleDelete(index)}>Удалить</button>
                    <button onClick={() => handleDisplayAlert(route)}>
                      Информация
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default AssignABus;
