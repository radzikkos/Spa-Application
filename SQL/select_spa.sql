/*Wypiswanie nazwy, nazwy seansów i pracowników w kursie o id 1*/
select (select ku.nazwa from kurs ku where ku.kurs_id = k.kurs_id), (select s.rodzaj from seans s where s.seans_id = k.seans_id), (select p.stanowisko from pracownik p where p.pracownik_id = k.pracownik_id)from kurs_seans k where
 k.kurs_id = 1;