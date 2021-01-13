CREATE VIEW cennik AS SELECT k.nazwa, k.cena_za_calosc from kurs k;
/*Wypisywanie stanowiska i nazwy seansu do niego przypisinaego*/
CREATE VIEW pracownik_seans as SELECT p.stanowisko, s.rodzaj from pracownik p, seans s where p.seans_id = s.seans_id;

/*Widok odnosnie seansu*/
CREATE VIEW widok_seansu as select s.pomieszczenie_id as nr_pomieszczenia,
    s.rodzaj,
    s.czas_trwania,
    (select count(*) from rzeczy_wykorzystane_do_seansu r where r.seans_id = s.seans_id) as liczba_rodzajow_produktow,
    (select sum(r.uzyta_ilosc) from rzeczy_wykorzystane_do_seansu r where r.seans_id = s.seans_id) as liczba_produktow
 from seans s ;

/*Widok pracownikow z wynagrodzeniem */
CREATE VIEW pracownik_wynagrodzenie as select
    p.pracownik_id,
    p.imie, 
    p.nazwisko, 
    p.stanowisko, 
    (select w.kwota from wynagrodzenie w where w.wynagrodzenie_id = p.wynagrodzenie_id) as zarobki_per_h
    from pracownik p;

/*Widok rzeczy z cena*/
CREATE VIEW rzeczy_cena as select 
    r.rzecz_id,
    r.nazwa,
    (select c.cena_pojedynczej_sztuki from cena_rzeczy c where c.cena_id = r.cena_id)
    from rzecz r;

/*Ilosc klientow w danym dniu*/
CREATE VIEW klienci_na_dzien as select zwroc_date(data_id) as data , count(klient_id) as liczba_klientow from klient_kurs group by data_id;

/*Łączny koszt kursow*/
CREATE VIEW pelen_kosz_kursow as select sum(cena_za_calosc) as caly_koszt from kurs;

/*Przychod na dzien*/
CREATE VIEW przychody as select zwroc_date(d.data_id) as dzien, zysk_na_dzien(data_id) from data d;

/*Wypisanie seansow w kursach*/
CREATE VIEW seanse_w_kursach as select k.nazwa as nazwa_kursu, zwroc_seansy_w_kursie(k.kurs_id) as nazwa_seansow from kurs k; 
