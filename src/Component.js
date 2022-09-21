import { useContext } from "react";
import { UserDataContext } from "./UserDataContext";
import { useForceUpdate } from "./customHooks";

function Section(props) {
  const { colors, style, title } = props;
  return (
    <div style={style}>
      <h2 style={{ textAlign: "center", color: colors.primary }}>{title}</h2>
      {props.children}
    </div>
  );
}
function InputSubsection(props) {
  const { colors, style } = props;
  return (
    <div style={style}>
      <h3 style={{ color: colors.primary, textAlign: "center" }}>Input data</h3>
      {props.children}
    </div>
  );
}
function OutputSubsection(props) {
  const { style } = props;
  return <div style={style}>{props.children}</div>;
}
function ResultSection(props) {
  const { colors, style } = props;
  return (
    <div style={{ ...style, backgroundColor: colors.resultBackground }}>
      <h2 style={{ textAlign: "center", color: colors.primary }}>Results</h2>
      {props.children}
    </div>
  );
}
function Button(props) {
  const { style, color, action } = props;
  return (
    <div style={{ ...style, backgroundColor: color }} onClick={action}>
      {props.children}
    </div>
  );
}

export default function Component(props) {
  const { userData, updateData, resetData } = useContext(UserDataContext);
  const {
    cpi,
    adBudget,
    usersAcquired,
    userOutflow,
    userInvites,
    adCpm,
    dailyAdsPerUser,
    adCpc,
    clickingUsers,
    appPrice,
    googleFee,
    buyingUsers,
  } = userData;
  const {
    inputUserAmount,
    switchInputUserAmount,
    calculatedRevenue,
    calculatedProfit,
  } = props;
  const {
    calculatedUserAmount,
    calculatedAdBudget,
    usersAfterOutflow,
    usersAfterInvites,
    monthlyImpressionsPerUser,
    monthlyImpressionRevenue,
    dailyClickRevenue,
    monthlyClickRevenue,
    inAppRevenue,
  } = props.calculatedValues;
  const forceUpdate = useForceUpdate();

  //STYLING
  const colors = {
    primary: "#FAC401",
    primaryBackground: "#840BE3",
    resultBackground: "#0D29FC",
  };
  const styles = {
    mainContainer: { width: "600px", margin: "0 auto" },
    section: {
      backgroundColor: colors.primaryBackground,
      borderRadius: "15px",
      filter: "drop-shadow(5px 5px 3px gray)",
      color: "white",
      padding: "10px",
      marginBottom: "25px",
    },
    inputSubsection: {
      borderRadius: "15px",
      borderColor: colors.primary,
      borderStyle: "solid",
    },
    outputSubsection: {
      fontSize: "150%",
      textAlign: "center",
    },
    textField: {
      width: "50px",
    },
    buttonContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    button: {
      fontSize: "125%",
      fontWeight: "bold",
      color: "white",
      width: "250px",
      borderRadius: "15px",
      filter: "drop-shadow(5px 5px 3px gray)",
      padding: "10px",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      cursor: "pointer",
      marginBottom: "25px",
    },
  };

  return (
    <div style={styles.mainContainer}>
      <h1 style={{ textAlign: "center" }}>
        Mobile Game Profitability Calculator
      </h1>
      <Section colors={colors} style={styles.section} title="User Acquisition">
        <InputSubsection colors={colors} style={styles.inputSubsection}>
          <ul style={{ listStyle: "none" }}>
            <li>
              CPI:{" "}
              <input
                type="number"
                min="0"
                style={styles.textField}
                name="cpi"
                value={cpi}
                onChange={updateData}
              />
              $
            </li>
            <li>
              <input
                type="checkbox"
                checked={inputUserAmount}
                onChange={switchInputUserAmount}
              />{" "}
              User amount:{" "}
              <input
                type="number"
                min="0"
                style={styles.textField}
                name="usersAcquired"
                value={usersAcquired}
                onChange={updateData}
              />
            </li>
            <li>
              <input
                type="checkbox"
                checked={!inputUserAmount}
                onChange={switchInputUserAmount}
              />{" "}
              Advertisement budget:{" "}
              <input
                type="number"
                min="0"
                style={styles.textField}
                name="adBudget"
                value={adBudget}
                onChange={updateData}
              />
              $
            </li>
            <li>
              User outflow:{" "}
              <input
                type="number"
                min="0"
                max="100"
                style={styles.textField}
                name="userOutflow"
                value={userOutflow}
                onChange={updateData}
              />
              %
            </li>
            <li>
              Users that invite:{" "}
              <input
                type="number"
                min="0"
                max="100"
                style={styles.textField}
                name="userInvites"
                value={userInvites}
                onChange={updateData}
              />
              %
            </li>
          </ul>
        </InputSubsection>
        <OutputSubsection style={styles.outputSubsection}>
          <ul style={{ listStyle: "none" }}>
            <li>
              {inputUserAmount
                ? `${cpi}$ CPI * ${usersAcquired} users = ${calculatedAdBudget}$`
                : `${adBudget}$ / ${cpi}$ CPI = ${calculatedUserAmount} users`}
            </li>
            <li>
              {userOutflow}% outflow leaves {usersAfterOutflow} users
            </li>
            <li>
              {userInvites}% of users inviting friends make {usersAfterInvites}{" "}
              users
            </li>
          </ul>
        </OutputSubsection>
      </Section>

      <Section
        colors={colors}
        style={styles.section}
        title="Ad Impression Revenue"
      >
        <InputSubsection colors={colors} style={styles.inputSubsection}>
          <ul style={{ listStyle: "none" }}>
            <li>
              CPM:{" "}
              <input
                type="number"
                min="0"
                style={styles.textField}
                name="adCpm"
                value={adCpm}
                onChange={updateData}
              />
              $
            </li>
            <li>
              Daily impressions per user:{" "}
              <input
                type="number"
                min="0"
                style={styles.textField}
                name="dailyAdsPerUser"
                value={dailyAdsPerUser}
                onChange={updateData}
              />
            </li>
          </ul>
        </InputSubsection>
        <OutputSubsection style={styles.outputSubsection}>
          <ul style={{ listStyle: "none" }}>
            <li>Monthly impressions per user: {monthlyImpressionsPerUser}</li>
            <li>Monthly ad impression revenue: {monthlyImpressionRevenue}$</li>
          </ul>
        </OutputSubsection>
      </Section>

      <Section colors={colors} style={styles.section} title="Ad Click Revenue">
        <InputSubsection colors={colors} style={styles.inputSubsection}>
          <ul style={{ listStyle: "none" }}>
            <li>
              CPC:{" "}
              <input
                type="number"
                min="0"
                style={styles.textField}
                name="adCpc"
                value={adCpc}
                onChange={updateData}
              />
              $
            </li>
            <li>
              Percent of users who click:{" "}
              <input
                type="number"
                min="0"
                max="100"
                style={styles.textField}
                name="clickingUsers"
                value={clickingUsers}
                onChange={updateData}
              />
              %
            </li>
          </ul>
        </InputSubsection>
        <OutputSubsection style={styles.outputSubsection}>
          <ul style={{ listStyle: "none" }}>
            <li>Daily ad click revenue: {dailyClickRevenue}$</li>
            <li>Monthly ad click revenue: {monthlyClickRevenue}$</li>
          </ul>
        </OutputSubsection>
      </Section>

      <Section
        colors={colors}
        style={styles.section}
        title="In-App Purchase Revenue"
      >
        <InputSubsection colors={colors} style={styles.inputSubsection}>
          <ul style={{ listStyle: "none" }}>
            <li>
              Item cost:{" "}
              <input
                type="number"
                min="0"
                style={styles.textField}
                name="appPrice"
                value={appPrice}
                onChange={updateData}
              />
              $
            </li>
            <li>
              App Store Fee:{" "}
              <input
                type="number"
                min="0"
                max="100"
                style={styles.textField}
                name="googleFee"
                value={googleFee}
                onChange={updateData}
              />
              %
            </li>
            <li>
              Users who purchase:{" "}
              <input
                type="number"
                min="0"
                max="100"
                style={styles.textField}
                name="buyingUsers"
                value={buyingUsers}
                onChange={updateData}
              />
              %
            </li>
          </ul>
        </InputSubsection>
        <OutputSubsection style={styles.outputSubsection}>
          <ul style={{ listStyle: "none" }}>
            <li>In-App Purchase revenue: {inAppRevenue}$</li>
          </ul>
        </OutputSubsection>
      </Section>

      <ResultSection colors={colors} style={styles.section}>
        <ul style={{ listStyle: "none", fontSize: "120%" }}>
          <li>Total Revenue: {calculatedRevenue}$</li>
          <li>Total Profit: {calculatedProfit}$</li>
        </ul>
      </ResultSection>

      <div style={styles.buttonContainer}>
        <Button style={styles.button} color="#3CB500" action={forceUpdate}>
          Recalculate
        </Button>
        <Button style={styles.button} color={"#D4240B"} action={resetData}>
          RESET
        </Button>
      </div>
    </div>
  );
}
