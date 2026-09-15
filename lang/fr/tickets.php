<?php

return [
    'status' => [
        'open' => 'Ouvert',
        'assigned' => 'Assigné',
        'in_progress' => 'En cours',
        'resolved' => 'Résolu',
        'closed' => 'Clôturé',
    ],

    'priority' => [
        'low' => 'Basse',
        'normal' => 'Normale',
        'high' => 'Haute',
        'critical' => 'Critique',
    ],

    'list' => [
        'heading' => 'Tickets',
        'empty' => 'Aucun ticket ne correspond à ces filtres.',
        'all_statuses' => 'Tous les statuts',
        'all_priorities' => 'Toutes les priorités',
        'filter_status' => 'Filtrer par statut',
        'filter_priority' => 'Filtrer par priorité',
        'columns' => [
            'title' => 'Titre',
            'requester' => 'Demandeur',
            'assigned_technician' => 'Technicien assigné',
            'status' => 'Statut',
            'priority' => 'Priorité',
            'comments_count' => 'Commentaires',
            'created_at' => 'Créé le',
        ],
        'sort_by' => 'Trier par :column',
        'unassigned' => 'Non assigné',
    ],

    'form' => [
        'create_heading' => 'Nouveau ticket',
        'edit_heading' => 'Modifier le ticket',
        'title' => 'Titre',
        'description' => 'Description',
        'priority' => 'Priorité',
        'technician' => 'Technicien',
        'submit' => 'Enregistrer',
        'assign' => 'Assigner',
        'attachment' => 'Pièce jointe',
        'attach' => 'Joindre',
        'attachments_heading' => 'Pièces jointes',
        'no_attachment' => 'Aucune pièce jointe pour le moment.',
    ],

    'messages' => [
        'created' => 'Ticket créé.',
        'updated' => 'Ticket mis à jour.',
        'assigned' => 'Ticket assigné.',
        'attached' => 'Fichier joint.',
    ],

    'validation' => [
        'title_required' => 'Un titre est obligatoire.',
        'title_max' => 'Le titre ne peut pas dépasser :max caractères.',
        'description_required' => 'Une description est obligatoire.',
        'priority_required' => 'Une priorité est obligatoire.',
        'priority_enum' => 'Cette priorité n’existe pas.',
        'attachment_required' => 'Un fichier est obligatoire.',
        'attachment_file' => 'La pièce jointe doit être un fichier.',
        'attachment_max' => 'La pièce jointe ne peut pas dépasser :max kilo-octets.',
    ],

    'exceptions' => [
        'invalid_status_transition' => 'Un ticket ne peut pas passer de :from à :to.',
    ],

    'notifications' => [
        'assigned' => [
            'subject' => 'Un ticket vous a été assigné',
            'introduction' => 'Un ticket vous a été assigné.',
            'ticket_title' => 'Titre : :title',
            'action' => 'Voir le ticket',
        ],
    ],
];
