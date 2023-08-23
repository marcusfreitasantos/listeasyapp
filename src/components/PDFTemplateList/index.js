import { useContext, useState } from "react";
import { ActivityIndicator } from "react-native";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import * as FileSystem from "expo-file-system";
import { Printer } from "react-native-feather";
import theme from "../../global/theme";
import * as S from "./styles";
import { GlobalContext } from "../../contexts/GlobalContext";
import { useNavigation } from "@react-navigation/native";

export default function PDFTemplateList({ listName, itemsList }) {
  const [isLoading, setIsLoading] = useState(false);
  const { isPurchased } = useContext(GlobalContext);
  const navigation = useNavigation();

  const html = `
    <html>
        <body>

        <style>
            body{
                margin: 0;
                padding: 0;
            }
            .pdf__container{
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              height: 100%;
            }
            .pdf__header{
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                background-color: ${theme.colors.primaryColorDark};
                padding: 15px;
                margin-bottom: 20px;
            }
            .pdf__header h1{
                font-size: 24px;
                color: ${theme.colors.lightColor};
                text-align: right;
                margin: 0;
            }
            .pdf__content h2{
                font-size: 20px;
                color: ${theme.colors.primaryColorDark};
                font-weight: bold;
            }
            .pdf__item_wrapper{
                display: flex;
                align-items: center;
                justify-content: space-between;
                background-color: ${theme.colors.lightColor};
                margin: 5px 0;
            }
            .pdf__item_title{
                font-size: 14px;
                color: ${theme.colors.primaryColorDark};
                font-weight: 400;
                flex: 1;
                padding: 15px;
            }
            .pdf__item_price{
                font-size: 14px;
                color: ${theme.colors.lightColor};
                background-color: ${theme.colors.secondaryColorDark};
                font-weight: bold;
                padding: 15px;
                width: 20%;
                text-align: right;  
            }
            footer{
                background-color: ${theme.colors.primaryColorDark};
                padding: 15px;  
                color: ${theme.colors.lightColor};
                font-size: 12px;
                text-align: center;
            }
            footer a{
                text-decoration: none;
                color: ${theme.colors.lightColor};
                font-size: 12px;
                text-align: center;
            }
        </style>

          <div class="pdf__container">
              <div class="pdf__header">
                  <img src="https://mafreitas.com.br/listeasy/img/listeasy-logo-2.svg" width: 100 />
                  <h1>${listName}</h1>
              </div>  
              
              <div class="pdf__content">
                  <h2>Lista de itens</h2>

                  ${itemsList
                    ?.map(
                      (item) =>
                        `<div class="pdf__item_wrapper">
                          <span class="pdf__item_title">${item?.itemName}</span>                        
                          <span class="pdf__item_price">R$ ${item?.itemPrice}</span>
                      </div>`
                    )
                    .join("")}        
              </div>

              <div style="flex: 1"></div>

              <footer>
                  <span>Disponível na PlayStore -> <a href="https://play.google.com/store/apps/details?id=com.penpack.listeasy">https://play.google.com/store/apps/details?id=com.penpack.listeasy </span>
              </footer>
          </div>
        </body>
    </html>
    `;

  const generatePdf = async () => {
    try {
      setIsLoading(true);
      const file = await printToFileAsync({
        html,
        base64: false,
      });

      const pdfName = `${file.uri.slice(
        0,
        file.uri.lastIndexOf("/") + 1
      )}lista_${listName.toLowerCase().replaceAll(" ", "_")}.pdf`;

      await FileSystem.moveAsync({
        from: file.uri,
        to: pdfName,
      });

      await shareAsync(pdfName);
    } catch (error) {
      console.log("Erro ao gerar pdf", error);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyPurchase = () => {
    if (isPurchased) {
      generatePdf();
    } else {
      navigation.navigate("PurchaseScreen");
    }
  };

  if (!isLoading) {
    return (
      <S.ListBox__btn onPress={verifyPurchase}>
        <Printer width={30} color={`${theme.colors.primaryColor}`} />
      </S.ListBox__btn>
    );
  } else {
    return <ActivityIndicator color={`${theme.colors.primaryColor}`} />;
  }
}
