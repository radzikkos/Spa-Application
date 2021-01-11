CREATE TABLE cena_rzeczy(
    cena_id INTEGER NOT NULL,
    cena_pojedynczej_sztuki FLOAT NOT NULL DEFAULT 1,
    CONSTRAINT cena_rzeczy_pk PRIMARY KEY (cena_id)
);

CREATE TABLE rzecz(
    rzecz_id SERIAL,
    cena_id INTEGER NOT NULL,
    nazwa VARCHAR NOT NULL,
    ilosc INTEGER,
    CONSTRAINT rzecz_pk PRIMARY KEY (rzecz_id),
    CONSTRAINT cena_id_fk FOREIGN KEY(cena_id) REFERENCES cena_rzeczy(cena_id) ON DELETE CASCADE
);

CREATE TABLE pomieszczenie(
    pomieszczenie_id INTEGER NOT NULL,
    CONSTRAINT pomieszczenie_pk PRIMARY KEY (pomieszczenie_id)
);

CREATE TABLE seans(
    seans_id SERIAL,
    pomieszczenie_id INTEGER NOT NULL,
    rodzaj VARCHAR NOT NULL,
    czas_trwania INTEGER NOT NULL,
    CONSTRAINT seans_pk PRIMARY KEY (seans_id),
    CONSTRAINT pomieszczenie_id_fk FOREIGN KEY(pomieszczenie_id) REFERENCES pomieszczenie(pomieszczenie_id)
);

CREATE TABLE rzeczy_wykorzystane_do_seansu(
    seans_id INTEGER NOT NULL,
    rzecz_id INTEGER NOT NULL,
    uzyta_ilosc INTEGER NOT NULL,
    CONSTRAINT rzeczy_wykorzystane_do_seansu_pk PRIMARY KEY(seans_id, rzecz_id),
    CONSTRAINT seans_id_fk FOREIGN KEY(seans_id) REFERENCES seans(seans_id),
    CONSTRAINT rzecz_id_fk FOREIGN KEY(rzecz_id) REFERENCES rzecz(rzecz_id)
);

CREATE TABLE wynagrodzenie(
    wynagrodzenie_id SERIAL,
    kwota INTEGER NOT NULL,
    CONSTRAINT wynagrodzenie_pk PRIMARY KEY(wynagrodzenie_id)
);

CREATE TABLE pracownik(
    pracownik_id SERIAL,
    seans_id INTEGER NOT NULL,
    wynagrodzenie_id INTEGER NOT NULL,
    imie VARCHAR NOT NULL,
    nazwisko VARCHAR NOT NULL,
    stanowisko VARCHAR NOT NULL,
    CONSTRAINT pracownik_id PRIMARY KEY(pracownik_id),
    CONSTRAINT seans_id_fk FOREIGN KEY(seans_id) REFERENCES seans(seans_id),
    CONSTRAINT wynagrodzenie_id_fk FOREIGN KEY(wynagrodzenie_id) REFERENCES wynagrodzenie(wynagrodzenie_id)
);

CREATE TABLE kurs(
    kurs_id SERIAL,
    nazwa VARCHAR NOT NULL UNIQUE,
    poziom_luksusu INTEGER NOT NULL,
    cena_za_calosc INTEGER DEFAULT 0, /*Bedzie trygger, ktory bedzie zwiekszal cene kursu przy dodawaniu seansu*/
    CONSTRAINT kurs_id PRIMARY KEY(kurs_id)
);

CREATE TABLE kurs_seans(
    /*seans-kurs_id pomieniete - nie widze potrzeby */
    kurs_id INTEGER NOT NULL,
    seans_id INTEGER NOT NULL,
    pracownik_id INTEGER NOT NULL,
    CONSTRAINT kurs_seans_pk PRIMARY KEY(kurs_id, seans_id),
    CONSTRAINT seans_id_fk FOREIGN KEY(seans_id) REFERENCES seans(seans_id) ON DELETE CASCADE,
    CONSTRAINT kurs_id_fk FOREIGN KEY(kurs_id) REFERENCES kurs(kurs_id) ON DELETE CASCADE
);

CREATE TABLE data(
    data_id SERIAL,
    -- dzien INTEGER NOT NULL,
    -- miesiac INTEGER NOT NULL,
    -- rok INTEGER NOT NULL,
    data VARCHAR NOT NULL UNIQUE,
    CONSTRAINT data_id_pk PRIMARY KEY(data_id)
);

CREATE TABLE klient(
    klient_id SERIAL,
    imie VARCHAR NOT NULL,
    nazwisko VARCHAR NOT NULL,
    pesel VARCHAR NOT NULL UNIQUE,
    CONSTRAINT klient_id_pk PRIMARY KEY(klient_id)
);

/*Klient w jednym dniu moze wziac jeden kurs*/
CREATE TABLE klient_kurs(
    klient_id INTEGER NOT NULL,
    kurs_id INTEGER NOT NULL,
    data_id INTEGER NOT NULL,
    CONSTRAINT klient_kurs_pk PRIMARY KEY(klient_id, data_id),
    CONSTRAINT klient_fk FOREIGN KEY(klient_id) REFERENCES klient(klient_id),
    CONSTRAINT kurs_fk FOREIGN KEY(kurs_id) REFERENCES kurs(kurs_id),
    CONSTRAINT data_fk FOREIGN KEY(data_id) REFERENCES data(data_id)
);

/*Trygger odpowiadający za modelowanie ceny kursu*/

CREATE OR REPLACE FUNCTION zmiana_ceny_kursu()
    RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
    DECLARE 
    wynagrodzenie integer := (select w.kwota from wynagrodzenie w where w.wynagrodzenie_id = (select p.wynagrodzenie_id from pracownik p where p.pracownik_id = NEW.pracownik_id));
    aktualna_calosc integer := (select k.cena_za_calosc from kurs k where k.kurs_id = NEW.kurs_id); 
    unused VARCHAR;
    begin
        select into unused sprawdz_czas_pracy(NEW.pracownik_id);
      wynagrodzenie := wynagrodzenie + aktualna_calosc + zwroc_cene_seansu(NEW.seans_id);
      UPDATE kurs SET cena_za_calosc = wynagrodzenie WHERE kurs_id = NEW.kurs_id;
      RETURN NEW;
    end;
    $$;

CREATE TRIGGER zmiana_ceny AFTER INSERT OR UPDATE OR DELETE ON kurs_seans
    FOR EACH ROW EXECUTE PROCEDURE zmiana_ceny_kursu();  

/*Kontrolowanie, by w jednym dniu nie bylo wiecej klientow niz 10*/
CREATE OR REPLACE FUNCTION kontroluj_ilosc_klientow()
    RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
    DECLARE 
        max_liczba_klientow_w_dniu integer := 10;
        licznik integer := 0;
        wiersz RECORD;
    begin
        select into licznik count(*) from klient_kurs kk where NEW.data_id = kk.data_id;
        if licznik < max_liczba_klientow_w_dniu then
          return NEW;
        else
          return NULL;
        end if;
    end;
    $$;

CREATE TRIGGER wystaczajaca_ilosc_miejsc 
    BEFORE INSERT ON klient_kurs
    FOR EACH ROW EXECUTE PROCEDURE kontroluj_ilosc_klientow();
/*Zwrot ceny rzeczy po id*/
CREATE OR REPLACE FUNCTION zwroc_cene_rzeczy(int4) RETURNS int4 AS
$$        -- otwarcie bloku programu
DECLARE   -- blok deklaracji
    cena integer := 0;
    id ALIAS FOR $1; -- alias argumentów
BEGIN
    select into cena c.cena_pojedynczej_sztuki from cena_rzeczy c where c.cena_id = (select r.cena_id from rzecz r where r.rzecz_id = id);
    return cena;
END;
$$ --zamkniecie bloku programu
LANGUAGE plpgsql;  -- deklaracja języka
----------------------------------------

/*Funckcja zwracajaca cene produktow wykorzystanych w seansie*/
CREATE OR REPLACE FUNCTION zwroc_cene_seansu(int4) RETURNS int4 AS
$$        -- otwarcie bloku programu
DECLARE   -- blok deklaracji
    id ALIAS FOR $1; -- alias argumentów
    wiersz RECORD;
    koszt integer := 0;
BEGIN
    FOR wiersz IN (SELECT rzecz_id, uzyta_ilosc FROM rzeczy_wykorzystane_do_seansu r WHERE r.seans_id = id)
    loop
      koszt := koszt + zwroc_cene_rzeczy(wiersz.rzecz_id) *  wiersz.uzyta_ilosc;
    end loop  ;
    return koszt;
END;
$$ --zamkniecie bloku programu
LANGUAGE plpgsql;  -- deklaracja języka

/*Funckja znajdujaca id pracownikow robiacyh dany seans po seans_id*/
CREATE OR REPLACE FUNCTION zwroc_pracownikow_robiacych_seans(int4) RETURNS TABLE (pracownik_id int4) AS
$$       
DECLARE   
    wiersz RECORD;
    seansid ALIAS FOR $1; -- alias argumentów
BEGIN
    RETURN QUERY 
    select p.pracownik_id from pracownik p where seansid = p.seans_id;
    IF NOT FOUND THEN
      RAISE EXCEPTION 'BRAK PRACOWNIKOW ROBIACYCH SEANS NR';
    END IF;
END;
$$ 
LANGUAGE plpgsql;  


/*Funckja zwracajaca id klienta o podanym imieniu i nazwisku*/
CREATE OR REPLACE FUNCTION zwroc_klient_id(VARCHAR, VARCHAR) RETURNS integer AS
$$       
DECLARE   
    imie_ ALIAS FOR $1;
    nazwisko_ ALIAS FOR $2;
    pesel_ VARCHAR;
BEGIN
    select into pesel_ k.klient_id from klient k where k.imie = imie_ and k.nazwisko = nazwisko_;
    IF NOT FOUND THEN
      RAISE EXCEPTION 'BRAK TAKIEGO KLIENTA';
    END IF;
    return pesel_;
END;
$$ 
LANGUAGE plpgsql;  

/*Funckja zwracajaca date dla data_id*/
CREATE OR REPLACE FUNCTION zwroc_date(int4) RETURNS TABLE(data VARCHAR) AS
$$       
DECLARE   
    data_id_ ALIAS FOR $1;
    
BEGIN 
    return QUERY
    select d.data from data d where d.data_id = data_id_;
    IF NOT FOUND THEN
      RAISE EXCEPTION 'BRAK TAKIEJ DATY';
    END IF;
END;
$$ 
LANGUAGE plpgsql;  

/*Funckja zwracajaca nazwe kursu po kurs_id*/
CREATE OR REPLACE FUNCTION zwroc_nazwe_kursu(int4) RETURNS VARCHAR AS
$$       
DECLARE   
    kurs_id_ ALIAS FOR $1;
    nazwa_ VARCHAR := 'NULL';
    
BEGIN 
    select into nazwa_ k.nazwa from kurs k where k.kurs_id = kurs_id_;
    
    if  NOT FOUND THEN
        RAISE EXCEPTION 'BRAK TAKIEGO KURSU';
    END IF;
    return nazwa_;
END;
$$ 
LANGUAGE plpgsql;  

/*Funckja Dane dla danego klienta zwraca kursy oraz daty*/
CREATE OR REPLACE FUNCTION zwroc_dane_klienta(VARCHAR, VARCHAR) RETURNS TABLE(d VARCHAR, data VARCHAR)  AS
$$       
DECLARE   
    imie_ ALIAS FOR $1;
    nazwisko_ ALIAS FOR $2;
    klient_id_ integer := zwroc_klient_id(imie_, nazwisko_);
    wiersz RECORD;
BEGIN 
    return QUERY
    select  zwroc_nazwe_kursu(k.kurs_id), zwroc_date(k.data_id) from klient_kurs k where k.klient_id = klient_id_;
END;
$$ 
LANGUAGE plpgsql;  

/*Funckja obliczająca ilość minut przepracowanych przez pracownika podanego przez jego id*/
CREATE OR REPLACE FUNCTION zwroc_czas_pracy(int4) RETURNS int4  AS
$$       
DECLARE   
    pracownik_id_ ALIAS FOR $1;
    czas integer := 0;
    temp_czas integer := 0;
    wiersz RECORD;
BEGIN 
    for wiersz in (select ks.seans_id from kurs_seans ks where ks.pracownik_id = pracownik_id_)
    loop
        select into temp_czas s.czas_trwania from seans s where s.seans_id = wiersz.seans_id; 
      czas := czas + temp_czas;
    end loop  ;
    return czas;
END;
$$ 
LANGUAGE plpgsql;  

/*Funkcja sprawdzajaca czy pracownik nie pracuje wiecej niz 150minut*/
CREATE OR REPLACE FUNCTION sprawdz_czas_pracy(int4) RETURNS VARCHAR  AS
$$       
DECLARE   
    pracownik_id_ ALIAS FOR $1;
    max_czas_pracy integer := 150;
    czas_pracy integer := 0;
BEGIN 
    czas_pracy := zwroc_czas_pracy(pracownik_id_);
    if czas_pracy <= max_czas_pracy then
      return 'TRUE';
    else
      RAISE EXCEPTION 'PRACOWNIK PRACUJE ZA DLUGO';
    end if;
END;
$$ 
LANGUAGE plpgsql; 

/*Funckja dla podanej daty zwraca klientow*/
CREATE OR REPLACE FUNCTION zwroc_klientow_w_danym_dniu(int4) RETURNS klient  AS
$$       
DECLARE   
    data_id_ ALIAS FOR $1;
    wiersz RECORD;
BEGIN 
    for wiersz in (select k.klient_id from klient_kurs k  where k.data_id = data_id_)
    
END;
$$ 
LANGUAGE plpgsql;

/*Funckja zwraca klientow w danym dniu, jako argument podajemy data_id*/
CREATE OR REPLACE FUNCTION zwroc_klientow_w_danym_dniu(int4) 
RETURNS TABLE(a VARCHAR,b VARCHAR) AS $$
    select kk.imie, kk.nazwisko from klient kk where kk.klient_id in (SELECT k.klient_id FROM klient_kurs k where k.data_id = $1);
$$
LANGUAGE SQL;

/*Funckja zamienia date VARCHAR na date_id*/
CREATE OR REPLACE FUNCTION zamien_date_na_data_id(VARCHAR) RETURNS int4  AS
$$       
DECLARE   
    data_ ALIAS FOR $1;
    data_int integer := 0;
BEGIN 
    select into data_int d.data_id from data d where d.data = data_;
    return data_int;
END;
$$ 
LANGUAGE plpgsql;


