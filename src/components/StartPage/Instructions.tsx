import "./Instructions.scss";

import React, {FunctionComponent} from 'react';
import firebase from '../../config/firebase';

const Instructions: FunctionComponent<IInstructionsProps> = ({userDetails}) => {
  return (<div>
    <h4>Riktigt roligt att du hittat hit, {userDetails && userDetails.displayName}!</h4>

    Denna applikation är utformad för att göra en sak enkelt och snabbt: Att lägga till dina olika träningsövningar.

    <div className="mt-1">
      <blockquote className="blockquote">Dessa 3 punkter behöver du veta:</blockquote>
      <ol>
        <li>Du lägger till en ny dag för att lägga till övningar</li>
        <li>En dag består av en, eller flera, övningar</li>
        <li>Det finns två olika övningstyper du kan välja mellan</li>
      </ol>
      Sådär. Inget mer, inget mindre. Hoppas det inte låter alltför krångligt <span role="img" aria-label="" aria-labelledby="">😉</span>
    </div>

    <blockquote className="blockquote">Fortsätt läsa om detta är din första gång som du använder applikationen för att få bättre förståelse hur du använder den.</blockquote>

    <h5>En dag</h5>
    <dl className="instructions--dl">
      <dt>Består av diverse information</dt>
      <dd>När man lägger till en dag kommer många fält vara ifyllda från början, detta för att man så snabbt som möjligt ska kunna börja träna. Du kan ändra informationen antigen innan du lägger till dagen eller i efterhand när du har tid.</dd>
      <dt>En timer startas automatiskt</dt>
      <dd>
        När man lägger till en ny dag kommer en timer automatiskt att starta. Denna kan hjälpa dig hålla koll på hur länge du har tränat, eller du kanske behöver veta hur lång vila du har haft mellan dina övningar?
        <br/>
        Denna timer syns längst ner på sidan där man ser timmar, minuter och sekunder. Om man vill stänga av den innan man avslutar sin dag kan man klicka upp menyn och trycka på <i>Stoppa timer</i>.
      </dd>
      <dt>Avsluta dag</dt>
      <dd>När man är klar med sitt träningspass trycker man på <i>Avsluta dag</i>-knappen. När man trycker på den knappen sätts en sluttid och timern stängs av.</dd>
    </dl>

    <h5>En övning</h5>
    <dl>
      <dt>Namn</dt>
      <dd><small>Oftast vad övningen heter (t.ex. bänkpress)</small></dd>
      <dt>Typ</dt>
      <dd><small>"Set och repetitioner" eller "Flås"</small></dd>
    </dl>

    En övning har ett namn, vilket oftas är den specifika övningen man gör, och är en av två typer.
    "Set med repetitioner och vikt" och "Flås"
    Om man väljer "sets and reps" kommer man få upp en vy där man skriver in sina repetitioner och vikt.
  </div>);
};

interface IInstructionsProps {
  userDetails: firebase.User | undefined
}

export default Instructions;