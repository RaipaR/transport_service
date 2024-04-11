<>
  <meta charSet="UTF-8" />
  <title>Заявка на автоперевозку</title>
  <style
    dangerouslySetInnerHTML={{
      __html:
        "\n        body { font-family: Arial, sans-serif; }\n        .application { margin: 20px; }\n        .section { margin-bottom: 20px; }\n        table { width: 100%; border-collapse: collapse; }\n        th, td { border: 1px solid black; padding: 8px; text-align: left; }\n    "
    }}
  />
  <div className="application">
    <div className="section">
      ИНН/КПП: {"{"}
      {"{"}INN_KPP{"}"}
      {"}"}, ОКПО: {"{"}
      {"{"}OKPO{"}"}
      {"}"}
      <br />
      Юридический адрес: {"{"}
      {"{"}legalAddress{"}"}
      {"}"}
      <br />
      Банковские реквизиты: {"{"}
      {"{"}bankDetails{"}"}
      {"}"}
      <br />
      БИК: {"{"}
      {"{"}BIC{"}"}
      {"}"}, к/с: {"{"}
      {"{"}corrAccount{"}"}
      {"}"}
      <br />
    </div>
    <h2>
      Заявка к договору транспортной экспедиции №{"{"}
      {"{"}contractNumber{"}"}
      {"}"}
    </h2>
    <div className="section">
      <strong>1. ПУНКТ ОТПРАВЛЕНИЯ:</strong> {"{"}
      {"{"}departurePoint{"}"}
      {"}"}
      <br />
      <strong>ПУНКТ НАЗНАЧЕНИЯ:</strong> {"{"}
      {"{"}destination{"}"}
      {"}"}
      <br />
    </div>
    <div className="section">
      <strong>2. ДАТА ПОГРУЗКИ:</strong> {"{"}
      {"{"}loadingDate{"}"}
      {"}"}
      <br />
      <strong>ВРЕМЯ:</strong> {"{"}
      {"{"}loadingTime{"}"}
      {"}"}
      <br />
    </div>
    <div className="section">
      <table>
        <tbody>
          <tr>
            <th>Наименование груза</th>
            <th>Упаковка груза</th>
            <th>Кол-во грузовых мест (шт.)</th>
            <th>Общий объем (м3)</th>
            <th>Общий вес (т)</th>
          </tr>
          <tr>
            <td>
              {"{"}
              {"{"}cargoName{"}"}
              {"}"}
            </td>
            <td>
              {"{"}
              {"{"}cargoPackaging{"}"}
              {"}"}
            </td>
            <td>
              {"{"}
              {"{"}cargoPlacesCount{"}"}
              {"}"}
            </td>
            <td>
              {"{"}
              {"{"}cargoVolume{"}"}
              {"}"}
            </td>
            <td>
              {"{"}
              {"{"}cargoWeight{"}"}
              {"}"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    {/* Добавьте другие разделы по аналогии */}
    <div className="section signature">
      Дата заполнения заявки: {"{"}
      {"{"}applicationDate{"}"}
      {"}"}
      <br />
      КЛИЕНТ: {"{"}
      {"{"}clientName{"}"}
      {"}"} / подпись
      <br />
    </div>
    <div className="section">
      ВНИМАНИЕ!!! Клиент несет ответственность за достоверность предоставленной
      информации...
    </div>
  </div>
</>
