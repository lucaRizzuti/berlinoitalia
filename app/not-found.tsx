import { Container } from "@/components/Container";
import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <Container className="py-28 text-center">
      <p className="kicker mb-6 text-rosso">Errore 404</p>
      <h1 className="text-[clamp(3rem,10vw,7rem)]">
        Scena
        <br />
        non trovata
      </h1>
      <p className="mx-auto mt-6 max-w-sm">
        La pagina che cercavi non esiste — o è stata improvvisata via.
      </p>
      <div className="mt-8">
        <Button href="/" variant="ink">
          Torna alla home
        </Button>
      </div>
    </Container>
  );
}
