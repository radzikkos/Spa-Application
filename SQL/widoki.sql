/*Rap3*/
CREATE VIEW cennik AS SELECT k.nazwa, k.cena_za_calosc from kurs k;
/*Wypisywanie stanowiska i nazwy seansu do niego przypisinaego*/
CREATE VIEW pracownik_seans as SELECT p.stanowisko, s.rodzaj from pracownik p, seans s where p.seans_id = s.seans_id;

/*Widok odnosnie seansu*/
CREATE VIEW widok_seansu as select s.pomieszczenie_id as nr_pomieszczenia,
    s.seans_id,
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
    r.ilosc,
    (select c.cena_pojedynczej_sztuki from cena_rzeczy c where c.cena_id = r.cena_id)
    from rzecz r;

/*Ilosc klientow w danym dniu*/
CREATE VIEW klienci_na_dzien as select zwroc_date(data_id) as data , count(klient_id) as liczba_klientow from klient_kurs group by data_id;

/*Łączny koszt kursow*/
CREATE VIEW pelen_kosz_kursow as select sum(cena_za_calosc) as caly_koszt from kurs;

/*Przychod na dzien*/
CREATE VIEW przychody as select d.data_id,zwroc_date(d.data_id) as dzien, zysk_na_dzien(data_id) from data d;

/*Wypisanie seansow w kursach*/
CREATE VIEW seanse_w_kursach as select k.kurs_id, k.nazwa as kurs, zwroc_seansy_w_kursie(k.kurs_id) as seans from kurs k; 

/*Rzeczy w seansie*/
CREATE VIEW rzeczy_w_seansie_widok as select r.seans_id, (select rr.nazwa from rzecz rr where rr.rzecz_id = r.rzecz_id), (select s.rodzaj from seans s where s.seans_id = r.seans_id), r.uzyta_ilosc from rzeczy_wykorzystane_do_seansu r;

/*Widok kursu bez kurs id*/
CREATE VIEW kurs_widok as select k.kurs_id, k.nazwa, k.poziom_luksusu, k.cena_za_calosc from kurs k;
/*rap1*/
/*Widok dla sensu i kursu, by pokazywac po nazwach*/
CREATE VIEW kurs_seans_widok  as select zwroc_nazwe_kursu(k.kurs_id) as kurs, zwroc_nazwe_seansu(k.seans_id) as seans_w_kursie , zwroc_stanowisko_pracownika(k.pracownik_id) as pracownik from kurs_seans k;
/*rap2*/
/*Widok dla klientow i kursu*/
CREATE VIEW klient_kurs_widok as  select zwroc_klienta_imie_i_nazwisko(k.klient_id) as klient , zwroc_nazwe_kursu(k.kurs_id) as kurs, zwroc_date(k.data_id) as data from klient_kurs k;

/*Kursy dla jednego klienta*/


/*Pracownik z czasem pracy itd*/
create view pracownik_wszystko as SELECT *, zwroc_czas_pracy(pracownik_id) as czas_pracy from pracownik_wynagrodzenie ORDER BY stanowisko;