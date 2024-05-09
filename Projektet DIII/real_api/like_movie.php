<?php

//Det den behöver göra är att ta emot ett id på den filmen man likear (det sköts i javascript)
//sedan behöver den lägga till det id:t i liked_movies arryen på den användaren som är inloggad.
//Antar att infon om den inloggade personen får skickas med i (javascript) (iallafall id:t måste på något sätt skickas med);
//så den måste hitta rätt användare i users nyckeln och sedan uppdatera deras liked_movies med movie_id:t