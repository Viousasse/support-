<?php

namespace Layers\Tickets\Policies;

use App\Access\Controls\AttachmentControl;
use Layers\Tickets\Models\Attachment;
use Lomkit\Access\Policies\ControlledPolicy;

final class AttachmentPolicy extends ControlledPolicy
{
    protected string $model = Attachment::class;

    protected string $control = AttachmentControl::class;
}
