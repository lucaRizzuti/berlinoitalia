import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/Container";
import { VideoGrid } from "@/components/VideoGrid";
import { JsonLd } from "@/components/JsonLd";
import { getVideos } from "@/lib/youtube";
import { videoLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Video",
  description:
    "Spettacoli, corsi e dietro le quinte di Berlino Italia Improv — la scuola di improvvisazione teatrale in italiano a Berlino, in video.",
  alternates: { canonical: "/video" },
};

export const revalidate = 21600;

export default async function VideoPage() {
  const videos = await getVideos();

  return (
    <>
      {videos.length > 0 && <JsonLd data={videoLd(videos)} />}
      <PageHeader kicker="Video" title={<>In<br />video</>} color="rosso">
        Spettacoli, corsi e momenti dietro le quinte. Dal nostro canale YouTube.
      </PageHeader>
      <Container className="pb-24">
        {videos.length > 0 ? (
          <VideoGrid videos={videos} />
        ) : (
          <p className="border-2 border-dashed border-ink/30 p-6 font-display text-sm uppercase tracking-[0.1em] text-ink/70">
            Nessun video al momento. Trovi tutto sul nostro canale YouTube.
          </p>
        )}
      </Container>
    </>
  );
}
