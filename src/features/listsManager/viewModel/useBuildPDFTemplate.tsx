import { useTheme } from "styled-components/native";
import { ListItemType } from "../model/list";

export const useBuildPDFTemplate = () => {
  const theme = useTheme();

  const buildHtmlPDFTemplate = (
    listName: string,
    itemsList: ListItemType[]
  ) => {
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
                  background-color: ${theme.secondaryColor};
                  padding: 15px;
                  margin-bottom: 20px;
              }
              .pdf__header h1{
                  font-size: 24px;
                  color: ${theme.textColor};
                  text-align: right;
                  margin: 0;
              }
              .pdf__content h2{
                  font-size: 20px;
                  color: ${theme.secondaryColor};
                  font-weight: bold;
              }
              .pdf__item_wrapper{
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  background-color: ${theme.textColor};
                  margin: 5px 0;
              }
              .pdf__item_title{
                  font-size: 14px;
                  color: ${theme.secondaryColor};
                  font-weight: 400;
                  flex: 1;
                  padding: 15px;
              }
              .pdf__item_price{
                  font-size: 14px;
                  color: ${theme.textColor};
                  background-color: ${theme.secondaryColor};
                  font-weight: bold;
                  padding: 15px;
                  width: 20%;
                  text-align: right;  
              }
              footer{
                  background-color: ${theme.secondaryColor};
                  padding: 15px;  
                  color: ${theme.textColor};
                  font-size: 12px;
                  text-align: center;
              }
              footer a{
                  text-decoration: none;
                  color: ${theme.secondaryColor};
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
                            <span class="pdf__item_title">${item.name}</span>                        
                            <span class="pdf__item_price">R$ ${item.price}</span>
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

    return html;
  };

  return {
    buildHtmlPDFTemplate,
  };
};
