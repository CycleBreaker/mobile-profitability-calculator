import { useState, useContext, useEffect } from "react";
import { UserDataContext } from "./UserDataContext";

export default function withContainer(Component) {
  return function Container(props) {
    const { userData } = useContext(UserDataContext);
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

    const [calculatedValues, setCalculatedValues] = useState({
      calculatedUserAmount: 0,
      calculatedAdBudget: 0,
      usersAfterOutflow: 0,
      usersAfterInvites: 0,
      //
      monthlyImpressionsPerUser: 0,
      monthlyImpressionRevenue: 0,
      //
      dailyClickRevenue: 0,
      monthlyClickRevenue: 0,
      //
      inAppRevenue: 0,
    });
    const [calculatedRevenue, setCalculatedRevenue] = useState(0);
    const [calculatedProfit, setCalculatedProfit] = useState(0);
    const [inputUserAmount, setInputUserAmount] = useState(true);
    const switchInputUserAmount = () => setInputUserAmount(!inputUserAmount);

    useEffect(() => {
      const finalUserAmount = inputUserAmount
        ? usersAcquired
        : calculatedValues.calculatedUserAmount;
      setCalculatedValues({
        calculatedUserAmount: Math.round(adBudget / cpi),
        calculatedAdBudget: finalUserAmount * cpi,
        usersAfterOutflow: Math.round(
          finalUserAmount - finalUserAmount * (userOutflow / 100)
        ),
        usersAfterInvites: Math.round(
          finalUserAmount -
            finalUserAmount * (userOutflow / 100) +
            (finalUserAmount - finalUserAmount * (userOutflow / 100)) *
              (userInvites / 100)
        ),
        monthlyImpressionsPerUser: dailyAdsPerUser * 30,
        monthlyImpressionRevenue: Number(
          ((adCpm / 1000) * finalUserAmount).toFixed(2)
        ),
        dailyClickRevenue: Number(
          (finalUserAmount * (clickingUsers / 100) * adCpc).toFixed(2)
        ),
        monthlyClickRevenue: Number(
          (calculatedValues.dailyClickRevenue * 30).toFixed(2)
        ),
        inAppRevenue: Number(
          (
            (appPrice - appPrice * (googleFee / 100)) *
            (finalUserAmount * (buyingUsers / 100))
          ).toFixed(2)
        ),
      });
    }, [userData, inputUserAmount]);

    useEffect(() => {
      setCalculatedRevenue(
        Number(
          (
            calculatedValues.monthlyImpressionRevenue +
            calculatedValues.monthlyClickRevenue +
            calculatedValues.inAppRevenue
          ).toFixed(2)
        )
      );
    }, [calculatedValues]);

    useEffect(() => {
      setCalculatedProfit(
        Number(
          (
            calculatedRevenue -
            (inputUserAmount ? calculatedValues.calculatedAdBudget : adBudget)
          ).toFixed(2)
        )
      );
    }, [calculatedRevenue]);

    return (
      <Component
        {...props}
        calculatedValues={calculatedValues}
        calculatedRevenue={calculatedRevenue}
        calculatedProfit={calculatedProfit}
        inputUserAmount={inputUserAmount}
        switchInputUserAmount={switchInputUserAmount}
      />
    );
  };
}
