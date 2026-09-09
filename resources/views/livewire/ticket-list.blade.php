<div>
    <p>DEBUG: tickets count = {{ $tickets->total() }}</p>

    @foreach($tickets as $ticket)
        <p>{{ $ticket->id }} - {{ $ticket->title }}</p>
    @endforeach

    {{ $tickets->links() }}
</div>
